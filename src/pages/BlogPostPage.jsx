import { Link } from 'react-router-dom'

export default function BlogPostPage() {
  return (
    <>
      {/* Header do Artigo */}
      <section className="blog-post-header">
        <div className="hp_container">
          <div className="post-breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">→</span>
            <Link to="/blog" className="breadcrumb-link">Blog</Link>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-current">Ansiedade no dia a dia</span>
          </div>

          <div className="post-header-content">
            <div className="post-meta">
              <span className="post-category">Saúde Mental</span>
              <span className="post-date">Dezembro 2024</span>
            </div>
            <h1 className="post-title">🌿 Ansiedade no dia a dia: como identificar e lidar</h1>
            <p className="post-intro">
              A ansiedade faz parte da vida de todos nós. Ela pode aparecer antes de uma entrevista de emprego, uma apresentação ou até em momentos de mudança. Sentir-se ansioso em algumas situações é normal, mas quando a ansiedade começa a limitar nossas escolhas e gerar sofrimento constante, é hora de olhar com mais atenção para esse sinal.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo do Artigo */}
      <article className="blog-post-content">
        <div className="hp_container">
          <div className="post-wrapper">
            <div className="post-body">
              {/* Seção: Como identificar */}
              <section className="content-section">
                <h2>🔎 Como identificar os sinais da ansiedade</h2>
                <p>A ansiedade pode se manifestar de várias formas, tanto no corpo quanto na mente. Alguns sinais comuns são:</p>

                <ul className="post-list">
                  <li>Preocupação excessiva com o futuro.</li>
                  <li>Dificuldade para relaxar ou "desligar a mente".</li>
                  <li>Insônia ou sono agitado.</li>
                  <li>Sintomas físicos como palpitação, falta de ar, dor no peito ou tensão muscular.</li>
                  <li>Pensamentos repetitivos e sensação de que algo ruim vai acontecer.</li>
                </ul>
              </section>

              {/* Seção: Dicas práticas */}
              <section className="content-section">
                <h2>🌸 Dicas práticas para lidar com a ansiedade</h2>
                <p>Embora a psicoterapia seja um caminho fundamental para compreender as causas da ansiedade e desenvolver estratégias personalizadas, algumas práticas simples podem ajudar no dia a dia:</p>

                <div className="tips-grid">
                  <div className="tip-card">
                    <h3>1. Respiração consciente</h3>
                    <p>Reserve alguns minutos para respirar profundamente, inspirando pelo nariz e expirando lentamente pela boca. Isso ajuda a acalmar o corpo.</p>
                  </div>

                  <div className="tip-card">
                    <h3>2. Rotina equilibrada</h3>
                    <p>Crie horários para dormir, se alimentar e descansar. O corpo se regula melhor quando existe organização.</p>
                  </div>

                  <div className="tip-card">
                    <h3>3. Atividade física</h3>
                    <p>Caminhadas leves, alongamentos ou exercícios regulares liberam endorfina e reduzem o estresse.</p>
                  </div>

                  <div className="tip-card">
                    <h3>4. Desconexão digital</h3>
                    <p>Reserve momentos do dia para se afastar das redes sociais e notícias. Isso evita sobrecarga mental.</p>
                  </div>

                  <div className="tip-card">
                    <h3>5. Apoio profissional</h3>
                    <p>Buscar acompanhamento psicológico pode ser essencial para aprender a lidar com os gatilhos da ansiedade de forma saudável.</p>
                  </div>
                </div>
              </section>

              {/* Seção: Importância da psicoterapia */}
              <section className="content-section highlight-section">
                <h2>💜 A importância da psicoterapia</h2>
                <p>A terapia é um espaço seguro e confidencial para falar sobre suas angústias, entender seus sentimentos e aprender a lidar com eles de maneira mais leve. O processo fortalece o autoconhecimento e oferece recursos internos para enfrentar os desafios da vida.</p>
              </section>

              {/* CTA do Artigo */}
              <section className="post-cta">
                <h2>📞 Quer conversar sobre isso?</h2>
                <p>Se você se identificou com este tema e sente que a ansiedade tem atrapalhado sua vida, saiba que você não está sozinho(a).</p>
                <a
                  href="https://wa.me/5511997145238?text=Olá%20Hellen,%20gostaria%20de%20saber%20mais%20sobre%20a%20terapia."
                  className="btn-cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  👉 Clique aqui para falar comigo no WhatsApp
                </a>
              </section>
            </div>

            {/* Sidebar com informações da autora */}
            <aside className="post-sidebar">
              <div className="author-card">
                <div className="author-avatar">
                  <span>👩‍⚕️</span>
                </div>
                <div className="author-info">
                  <h3>Hellen Brandão</h3>
                  <p>Psicóloga CRP 06/121942</p>
                  <p className="author-bio">
                    Especializada em atendimento psicológico online para ansiedade, relacionamentos e autoestima.
                  </p>
                  <a href="https://wa.me/5511997145238" className="author-contact">
                    Fale comigo
                  </a>
                </div>
              </div>

              <div className="related-posts">
                <h3>Outros artigos</h3>
                <div className="related-list">
                  <Link to="/blog" className="related-item">
                    <h4>Fortalecendo a autoestima</h4>
                    <p>Como desenvolver uma relação mais gentil consigo mesmo</p>
                  </Link>
                  <Link to="/blog" className="related-item">
                    <h4>Comunicação saudável</h4>
                    <p>Dicas para melhorar relacionamentos interpessoais</p>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Navegação do Post */}
      <section className="post-navigation">
        <div className="hp_container">
          <div className="nav-links">
            <Link to="/blog" className="btn-outline">
              ← Voltar para o Blog
            </Link>
            <Link to="/contact" className="btn-primary">
              Agendar Consulta
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}