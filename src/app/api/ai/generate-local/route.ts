import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { content, type } = await request.json()

    if (!content) {
      return NextResponse.json({ error: 'Conteúdo é obrigatório' }, { status: 400 })
    }

    // Remove HTML tags for analysis
    const textContent = content.replace(/<[^>]*>/g, '').trim()

    if (textContent.length < 50) {
      return NextResponse.json({ error: 'Conteúdo muito curto para gerar sugestões' }, { status: 400 })
    }

    let generatedContent = ''

    switch (type) {
      case 'title':
        generatedContent = generateTitles(textContent)
        break
      case 'summary':
        generatedContent = generateSummary(textContent)
        break
      case 'tags':
        generatedContent = generateTags(textContent)
        break
      default:
        return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 })
    }

    return NextResponse.json({ content: generatedContent })

  } catch (error: any) {
    console.error('Erro na API de IA local:', error)
    return NextResponse.json({
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}

function generateTitles(content: string): string {
  const words = content.toLowerCase().split(/\s+/)

  // Análise mais sofisticada do conteúdo
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

  // Detecta temas principais
  const detectedThemes = []
  for (const [theme, keywords] of Object.entries(keywordMap)) {
    if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
      detectedThemes.push(theme)
    }
  }

  // Templates mais criativos e variados
  const titleTemplates = [
    // Templates diretos
    [`5 sinais de que você precisa cuidar da sua ${detectedThemes[0] || 'saúde mental'}`,
     `O que ninguém te conta sobre ${detectedThemes[0] || 'desenvolvimento pessoal'}`,
     `Como transformar ${detectedThemes[0] || 'desafios'} em oportunidades de crescimento`],

    // Templates questionadores
    [`Por que é tão difícil lidar com ${detectedThemes[0] || 'emoções'}?`,
     `Você sabia que ${detectedThemes[0] || 'autoconhecimento'} pode mudar sua vida?`,
     `O que fazer quando ${detectedThemes[0] || 'tudo parece difícil'}?`],

    // Templates inspiradores
    [`A jornada para superar ${detectedThemes[0] || 'obstáculos emocionais'}`,
     `Redescobrindo sua força interior através da ${detectedThemes[0] || 'terapia'}`,
     `O poder da ${detectedThemes[0] || 'autorreflexão'} na transformação pessoal`],

    // Templates práticos
    [`Estratégias comprovadas para melhorar sua ${detectedThemes[0] || 'qualidade de vida'}`,
     `Passo a passo para desenvolver ${detectedThemes[0] || 'resiliência emocional'}`,
     `Técnicas simples para fortalecer sua ${detectedThemes[0] || 'saúde mental'}`]
  ]

  // Escolhe um conjunto aleatório de templates
  const randomTemplateSet = titleTemplates[Math.floor(Math.random() * titleTemplates.length)]

  // Adiciona variação com base no conteúdo
  const contentLength = words.length
  if (contentLength > 200) {
    randomTemplateSet[0] = `Guia completo: ${randomTemplateSet[0].toLowerCase()}`
  } else if (contentLength < 100) {
    randomTemplateSet[0] = `Reflexão rápida: ${randomTemplateSet[0].toLowerCase()}`
  }

  return randomTemplateSet.join('\n')
}

function generateSummary(content: string): string {
  const sentences = content.split(/[.!?]/).filter(s => s.trim().length > 20)
  const words = content.toLowerCase().split(/\s+/)

  // Análise mais profunda do conteúdo
  const contentAnalysis = {
    'ansiedade': {
      keywords: ['ansiedade', 'preocupação', 'nervoso', 'medo', 'tensão', 'pânico'],
      summaries: [
        'Explore estratégias comprovadas para gerenciar a ansiedade e recuperar sua paz interior.',
        'Descubra como transformar momentos de ansiedade em oportunidades de autoconhecimento.',
        'Aprenda técnicas práticas para acalmar a mente e encontrar equilíbrio emocional.'
      ]
    },
    'autoestima': {
      keywords: ['autoestima', 'confiança', 'valor', 'autoimagem', 'autoaceitação'],
      summaries: [
        'Uma jornada inspiradora para redescobrir seu valor pessoal e fortalecer a confiança em si mesmo.',
        'Insights poderosos sobre como desenvolver uma relação mais saudável consigo mesmo.',
        'Estratégias transformadoras para construir uma autoestima sólida e duradoura.'
      ]
    },
    'relacionamento': {
      keywords: ['relacionamento', 'amor', 'parceiro', 'casal', 'comunicação', 'conflito'],
      summaries: [
        'Navegue pelas complexidades dos relacionamentos com sabedoria e compreensão.',
        'Descubra os segredos de uma comunicação efetiva e conexões mais profundas.',
        'Transforme desafios relacionais em oportunidades de crescimento mútuo.'
      ]
    },
    'trabalho': {
      keywords: ['trabalho', 'carreira', 'profissional', 'emprego', 'burnout', 'stress'],
      summaries: [
        'Encontre o equilíbrio entre sucesso profissional e bem-estar pessoal.',
        'Estratégias para prosperar no ambiente de trabalho sem sacrificar sua saúde mental.',
        'Redescubra o propósito e a satisfação em sua jornada profissional.'
      ]
    },
    'mudança': {
      keywords: ['mudança', 'transição', 'novo', 'transformação', 'evolução'],
      summaries: [
        'Abrace as mudanças da vida com coragem e encontre força na incerteza.',
        'Um guia sensível para navegar por transições de vida com resiliência.',
        'Descubra como transformar períodos de mudança em oportunidades de crescimento.'
      ]
    }
  }

  // Detecta o tema principal
  let selectedTheme: string | null = null
  let maxMatches = 0

  for (const [theme, data] of Object.entries(contentAnalysis)) {
    const matches = data.keywords.filter(keyword =>
      content.toLowerCase().includes(keyword)
    ).length

    if (matches > maxMatches) {
      maxMatches = matches
      selectedTheme = theme
    }
  }

  // Escolhe um resumo aleatório do tema detectado
  if (selectedTheme && contentAnalysis[selectedTheme as keyof typeof contentAnalysis]) {
    const summaries = contentAnalysis[selectedTheme as keyof typeof contentAnalysis].summaries
    const randomSummary = summaries[Math.floor(Math.random() * summaries.length)]

    // Adiciona contexto baseado no tamanho do conteúdo
    const contentLength = words.length
    if (contentLength > 300) {
      return `${randomSummary} Este artigo abrangente oferece uma visão profunda e prática sobre o tema.`
    } else if (contentLength < 100) {
      return `${randomSummary} Uma reflexão concisa mas poderosa para inspirar sua jornada.`
    }

    return `${randomSummary} Prepare-se para insights que podem transformar sua perspectiva.`
  }

  // Resumo genérico mais criativo
  const genericSummaries = [
    'Uma reflexão profunda sobre desenvolvimento pessoal que pode transformar sua jornada de autoconhecimento.',
    'Insights valiosos para quem busca crescimento emocional e uma vida mais plena e consciente.',
    'Descubra perspectivas transformadoras que podem enriquecer sua compreensão sobre si mesmo e suas relações.',
    'Um convite à reflexão sobre temas essenciais para o bem-estar mental e emocional.'
  ]

  return genericSummaries[Math.floor(Math.random() * genericSummaries.length)]
}

function generateTags(content: string): string {
  const words = content.toLowerCase().split(/\s+/)

  // Tags categorizadas por tema com mais variedade
  const tagCategories = {
    'emotions': {
      keywords: ['ansiedade', 'medo', 'tristeza', 'alegria', 'raiva', 'frustração', 'preocupação'],
      tags: ['gestão emocional', 'inteligência emocional', 'regulação emocional', 'mindfulness', 'equilíbrio mental']
    },
    'relationships': {
      keywords: ['relacionamento', 'amor', 'parceiro', 'família', 'comunicação', 'conflito', 'casal'],
      tags: ['relacionamentos saudáveis', 'comunicação assertiva', 'vínculos afetivos', 'terapia de casal', 'dinâmica familiar']
    },
    'selfesteem': {
      keywords: ['autoestima', 'confiança', 'valor', 'autoimagem', 'autoaceitação'],
      tags: ['autoconfiança', 'autovalorização', 'amor próprio', 'desenvolvimento pessoal', 'empoderamento']
    },
    'work': {
      keywords: ['trabalho', 'carreira', 'profissional', 'burnout', 'stress', 'emprego'],
      tags: ['vida profissional', 'equilíbrio trabalho-vida', 'produtividade saudável', 'propósito profissional', 'gestão de stress']
    },
    'growth': {
      keywords: ['crescimento', 'mudança', 'transformação', 'evolução', 'desenvolvimento'],
      tags: ['transformação pessoal', 'jornada de autoconhecimento', 'resiliência', 'superação', 'potencial humano']
    },
    'therapy': {
      keywords: ['terapia', 'psicoterapia', 'tratamento', 'psicólogo', 'ajuda'],
      tags: ['processo terapêutico', 'saúde mental', 'cuidado psicológico', 'bem-estar psicológico', 'acompanhamento psicológico']
    },
    'lifestyle': {
      keywords: ['rotina', 'hábitos', 'qualidade', 'vida', 'cotidiano'],
      tags: ['qualidade de vida', 'hábitos saudáveis', 'estilo de vida', 'autocuidado', 'bem-viver']
    }
  }

  // Tags base sempre incluídas (mas com variação)
  const baseTags = [
    ['psicologia', 'saúde mental', 'bem-estar'],
    ['autoconhecimento', 'desenvolvimento pessoal', 'crescimento pessoal'],
    ['terapia online', 'psicologia clínica', 'suporte psicológico']
  ]

  // Seleciona aleatoriamente tags base
  const selectedBaseTags = baseTags[Math.floor(Math.random() * baseTags.length)]
  const foundTags = [...selectedBaseTags]

  // Detecta categorias relevantes e adiciona tags específicas
  let categoriesFound = 0
  for (const [category, data] of Object.entries(tagCategories)) {
    const hasKeywords = data.keywords.some(keyword =>
      content.toLowerCase().includes(keyword)
    )

    if (hasKeywords && categoriesFound < 2) { // Limita a 2 categorias para não sobrecarregar
      // Adiciona 2-3 tags aleatórias da categoria
      const shuffledTags = data.tags.sort(() => 0.5 - Math.random())
      foundTags.push(...shuffledTags.slice(0, Math.floor(Math.random() * 2) + 2))
      categoriesFound++
    }
  }

  // Tags contextuais baseadas no tamanho do conteúdo
  const contentLength = words.length
  if (contentLength > 300) {
    foundTags.push('artigo completo')
  } else if (contentLength < 100) {
    foundTags.push('reflexão rápida')
  }

  // Tags emocionais aleatórias para dar mais variedade
  const emotionalTags = [
    'inspiração', 'motivação', 'esperança', 'transformação',
    'clareza mental', 'paz interior', 'equilíbrio', 'harmonia',
    'força interior', 'renovação', 'descoberta', 'libertação'
  ]

  // Adiciona 1-2 tags emocionais aleatórias
  const randomEmotionalTags = emotionalTags
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 2) + 1)

  foundTags.push(...randomEmotionalTags)

  // Remove duplicatas e limita a 8 tags
  const uniqueTags = [...new Set(foundTags)].slice(0, 8)
  return uniqueTags.join(', ')
}