import { NextRequest, NextResponse } from 'next/server'

// Função para usar Groq (gratuito e rápido)
async function generateWithGroq(content: string, type: string) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY não configurada')
  }

  const { prompt, systemMessage } = getPrompts(content, type)

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ],
      max_tokens: type === 'article' ? 1500 : 150,
      temperature: 0.7,
      stream: false
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Groq API error details:', errorText)
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('Groq response structure:', data)
    throw new Error('Resposta inválida do Groq')
  }

  return data.choices[0].message.content?.trim()
}

// Função para usar OpenAI
async function generateWithOpenAI(content: string, type: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY não configurada')
  }

  const OpenAI = (await import('openai')).default
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const { prompt, systemMessage } = getPrompts(content, type)

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: prompt }
    ],
    max_tokens: 200,
    temperature: 0.7,
  })

  return completion.choices[0]?.message?.content?.trim()
}

// Função para usar Hugging Face (gratuito)
async function generateWithHuggingFace(content: string, type: string) {
  if (!process.env.HUGGINGFACE_API_KEY) {
    throw new Error('HUGGINGFACE_API_KEY não configurada')
  }

  const { prompt } = getPrompts(content, type)

  const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_length: 200,
        temperature: 0.7,
      }
    }),
  })

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data[0]?.generated_text?.trim()
}

// Função local como fallback - importa diretamente as funções
async function generateLocal(content: string, type: string) {
  // Importa as funções locais diretamente para evitar problemas de fetch
  const textContent = content.replace(/<[^>]*>/g, '').trim()

  if (type === 'title') {
    return generateTitlesLocal(textContent)
  } else if (type === 'summary') {
    return generateSummaryLocal(textContent)
  } else if (type === 'tags') {
    return generateTagsLocal(textContent)
  } else if (type === 'article') {
    return generateArticleLocal(textContent)
  }

  throw new Error('Tipo inválido para geração local')
}

// Funções locais copiadas do generate-local
function generateTitlesLocal(content: string): string {
  const words = content.toLowerCase().split(/\s+/)

  const keywordMap = {
    'ansiedade': ['ansiedade', 'preocupação', 'nervoso', 'medo', 'tensão'],
    'autoestima': ['autoestima', 'confiança', 'valor', 'autoimagem', 'autoaceitação'],
    'relacionamento': ['relacionamento', 'amor', 'parceiro', 'casal', 'comunicação'],
    'depressão': ['depressão', 'tristeza', 'melancolia', 'desânimo', 'humor'],
    'trabalho': ['trabalho', 'carreira', 'profissional', 'emprego', 'burnout'],
    'família': ['família', 'pais', 'filhos', 'irmãos', 'parentes'],
    'mudança': ['mudança', 'transição', 'novo', 'transformação', 'evolução'],
    'stress': ['stress', 'pressão', 'sobrecarga', 'cansaço', 'exaustão']
  }

  const detectedThemes = []
  for (const [theme, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
      detectedThemes.push(theme)
    }
  }

  const titleTemplates = [
    [`5 sinais de que você precisa cuidar da sua ${detectedThemes[0] || 'saúde mental'}`,
     `O que ninguém te conta sobre ${detectedThemes[0] || 'desenvolvimento pessoal'}`,
     `Como transformar ${detectedThemes[0] || 'desafios'} em oportunidades de crescimento`],
    [`Por que é tão difícil lidar com ${detectedThemes[0] || 'emoções'}?`,
     `Você sabia que ${detectedThemes[0] || 'autoconhecimento'} pode mudar sua vida?`,
     `O que fazer quando ${detectedThemes[0] || 'tudo parece difícil'}?`],
    [`A jornada para superar ${detectedThemes[0] || 'obstáculos emocionais'}`,
     `Redescobrindo sua força interior através da ${detectedThemes[0] || 'terapia'}`,
     `O poder da ${detectedThemes[0] || 'autorreflexão'} na transformação pessoal`]
  ]

  const randomTemplateSet = titleTemplates[Math.floor(Math.random() * titleTemplates.length)]
  return randomTemplateSet.join('\n')
}

function generateSummaryLocal(content: string): string {
  const genericSummaries = [
    'Uma reflexão profunda sobre desenvolvimento pessoal que pode transformar sua jornada de autoconhecimento.',
    'Insights valiosos para quem busca crescimento emocional e uma vida mais plena e consciente.',
    'Descubra perspectivas transformadoras que podem enriquecer sua compreensão sobre si mesmo e suas relações.',
    'Um convite à reflexão sobre temas essenciais para o bem-estar mental e emocional.'
  ]

  return genericSummaries[Math.floor(Math.random() * genericSummaries.length)]
}

function generateTagsLocal(content: string): string {
  const baseTags = ['psicologia', 'saúde mental', 'bem-estar', 'autoconhecimento', 'desenvolvimento pessoal']
  const emotionalTags = ['inspiração', 'transformação', 'crescimento', 'reflexão']

  const randomEmotional = emotionalTags[Math.floor(Math.random() * emotionalTags.length)]
  const allTags = [...baseTags, randomEmotional]

  return allTags.slice(0, 6).join(', ')
}

function generateArticleLocal(content: string): string {
  const themes = ['ansiedade', 'autoestima', 'relacionamentos', 'desenvolvimento pessoal', 'bem-estar mental']
  const theme = themes[Math.floor(Math.random() * themes.length)]

  return `<h2>Introdução</h2>
<p>Como psicóloga, tenho observado ao longo dos anos como questões relacionadas a ${theme} afetam profundamente a vida das pessoas. Hoje, quero compartilhar algumas reflexões importantes sobre este tema.</p>

<h2>Compreendendo o Tema</h2>
<p>É fundamental entendermos que cada pessoa possui uma história única, e por isso, cada jornada de autoconhecimento e crescimento pessoal é diferente. Em minha prática clínica, vejo constantemente como pequenas mudanças podem gerar grandes transformações.</p>

<h2>Sinais Importantes</h2>
<p>Alguns sinais que merecem nossa atenção incluem:</p>
<ul>
<li>Mudanças significativas no humor</li>
<li>Dificuldades para manter relacionamentos saudáveis</li>
<li>Sensação constante de sobrecarga emocional</li>
<li>Perda de interesse em atividades antes prazerosas</li>
</ul>

<h2>Estratégias Práticas</h2>
<p>Com base em minha experiência profissional, algumas estratégias que podem ser úteis:</p>

<p><strong>Autoconhecimento:</strong> Dedique alguns minutos diários para refletir sobre seus sentimentos e pensamentos. O autoconhecimento é o primeiro passo para qualquer mudança positiva.</p>

<p><strong>Rede de apoio:</strong> Cultive relacionamentos saudáveis e não hesite em buscar ajuda quando necessário. Todos precisamos de suporte em algum momento.</p>

<p><strong>Autocuidado:</strong> Pratique atividades que promovam seu bem-estar físico e mental. Isso pode incluir exercícios, meditação, leitura ou qualquer hobby que lhe traga prazer.</p>

<h2>Quando Buscar Ajuda Profissional</h2>
<p>É importante lembrar que buscar ajuda psicológica não é sinal de fraqueza, mas sim de coragem e autocuidado. Se você sente que suas dificuldades estão interferindo significativamente em sua qualidade de vida, considere procurar um profissional.</p>

<h2>Conclusão</h2>
<p>Lembre-se: você não está sozinho nessa jornada. Como psicóloga, acredito profundamente na capacidade humana de crescimento e transformação. Cada dia é uma nova oportunidade para cuidarmos melhor de nós mesmos e construirmos uma vida mais plena e significativa.</p>

<p>Se este artigo ressoou com você, ou se você tem dúvidas sobre seu bem-estar emocional, não hesite em entrar em contato. Estou aqui para ajudar você em sua jornada de autoconhecimento e crescimento pessoal.</p>`
}

function getPrompts(content: string, type: string) {
  const textContent = content.replace(/<[^>]*>/g, '').trim().substring(0, 800)

  let prompt = ''
  let systemMessage = ''

  switch (type) {
    case 'title':
      systemMessage = 'Você cria títulos para artigos de psicologia. Seja criativo e atrativo.'
      prompt = `Crie 3 títulos para este artigo de psicologia:

"${textContent}"

Títulos (um por linha):`
      break

    case 'summary':
      systemMessage = 'Você cria resumos para artigos de psicologia. Seja conciso e interessante.'
      prompt = `Crie um resumo atrativo para este artigo:

"${textContent}"

Resumo:`
      break

    case 'tags':
      systemMessage = 'Você cria tags para artigos de psicologia.'
      prompt = `Crie 6 tags para este artigo:

"${textContent}"

Tags (separadas por vírgula):`
      break

    case 'article':
      systemMessage = 'Você é Hellen Brandão, psicóloga formada desde 2013, especializada em atendimento psicológico online. Escreva artigos completos de 1000+ palavras sobre psicologia, sempre na primeira pessoa como se fosse você escrevendo. Use HTML para formatação. Seja detalhada, acolhedora e inclua muitos exemplos práticos da sua experiência clínica.'
      prompt = `Escreva um artigo COMPLETO e DETALHADO de psicologia sobre este tema:

"${textContent}"

REQUISITOS OBRIGATÓRIOS:
- Mínimo 1000 palavras (seja muito detalhada)
- Use HTML: <h2>, <p>, <strong>, <ul>, <li>
- Linguagem primeira pessoa (eu, minha experiência)
- Tom acolhedor e profissional
- Muitos exemplos práticos
- Várias seções bem desenvolvidas

ESTRUTURA OBRIGATÓRIA:
1. Introdução (150 palavras) - Sua experiência com o tema
2. O que você observa na prática clínica (200 palavras)
3. Sinais e sintomas detalhados (200 palavras)
4. Estratégias práticas com exemplos (300 palavras)
5. Quando buscar ajuda profissional (100 palavras)
6. Conclusão com convite para contato (100 palavras)

Escreva MUITO detalhadamente cada seção. Não economize palavras. Seja específica e prática.

ARTIGO COMPLETO:`
      break

    default:
      throw new Error('Tipo inválido')
  }

  return { prompt, systemMessage }
}

export async function POST(request: NextRequest) {
  try {
    const { content, type } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'Conteúdo é obrigatório' }, { status: 400 })
    }

    const textContent = content.replace(/<[^>]*>/g, '').trim()

    if (textContent.length < 50) {
      return NextResponse.json({ error: 'Conteúdo muito curto para gerar sugestões' }, { status: 400 })
    }

    let generatedContent = ''
    let lastError = ''

    // Tenta diferentes provedores em ordem de preferência
    const providers = type === 'article'
      ? [
          { name: 'Groq', func: generateWithGroq },
          { name: 'OpenAI', func: generateWithOpenAI },
          { name: 'HuggingFace', func: generateWithHuggingFace }
        ]
      : [
          { name: 'Groq', func: generateWithGroq },
          { name: 'OpenAI', func: generateWithOpenAI },
          { name: 'HuggingFace', func: generateWithHuggingFace },
          { name: 'Local', func: generateLocal }
        ]

    for (const provider of providers) {
      try {
        console.log(`Tentando gerar conteúdo com ${provider.name}...`)
        generatedContent = await provider.func(content, type)

        if (generatedContent) {
          console.log(`✅ Sucesso com ${provider.name}`)
          break
        }
      } catch (error: any) {
        console.log(`❌ Falha com ${provider.name}:`, error.message)
        lastError = error.message
        continue
      }
    }

    if (!generatedContent) {
      const errorMessage = type === 'article'
        ? `Não foi possível gerar o artigo usando IA. Verifique sua conexão com internet e tente novamente. Erro: ${lastError}`
        : `Não foi possível gerar o conteúdo. Último erro: ${lastError}`

      return NextResponse.json({
        error: errorMessage
      }, { status: 500 })
    }

    return NextResponse.json({ content: generatedContent })

  } catch (error: any) {
    console.error('Erro na API de IA:', error)
    return NextResponse.json({
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}