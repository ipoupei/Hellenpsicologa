import Link from 'next/link'
import { listPosts } from '@/lib/blog'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const { data: latestPosts } = await listPosts({ pageSize: 3 })

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hp_container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Cuide da sua saúde emocional em um espaço seguro e acolhedor</h1>
              <p className="hero-description">Atendimento psicológico online para lidar com ansiedade, relacionamentos, autoestima e desafios da vida.</p>
              <div className="hero-buttons">
                <a href="https://wa.me/5511997145238" className="btn-primary">
                  Agende sua sessão
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-circle">
                <span>👩‍⚕️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Mim */}
      <section className="about-section">
        <div className="hp_container">
          <div className="section-header">
            <span className="section-tag">Sobre Mim</span>
            <h2>Hellen Brandão</h2>
            <p>Psicóloga formada desde 2013</p>
          </div>

          <div className="about-content">
            <div className="about-text">
              <p>Olá, sou Hellen Brandão, psicóloga formada desde 2013. Minha trajetória na psicologia é marcada pela escuta atenta e pela crença de que cada pessoa carrega uma história única.</p>

              <p>Nos atendimentos, já acompanhei pessoas em diferentes momentos: ansiedade, baixa autoestima, dificuldades nos relacionamentos, sobrecarga no trabalho e fases de transição.</p>

              <div className="highlight-box">
                <p>💜 Acredito que a terapia é um processo de autoconhecimento, fortalecimento e transformação.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="services-section">
        <div className="hp_container">
          <div className="section-header">
            <span className="section-tag">Como posso ajudar</span>
            <h2>Serviços de Atendimento</h2>
            <p>Atendimento psicológico online especializado em diferentes fases da vida</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">👩‍💼</div>
              <h3>Adultos</h3>
              <p>Apoio em momentos de ansiedade, depressão, autoestima, relacionamentos e sobrecarga profissional.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">🧑‍🎓</div>
              <h3>Adolescentes</h3>
              <p>Espaço para lidar com autoconhecimento, dificuldades escolares, relacionamentos e identidade.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">💡</div>
              <h3>Orientações Pontuais</h3>
              <p>Suporte para tomada de decisões, conflitos familiares ou profissionais, e situações de estresse.</p>
            </div>
          </div>

          <div className="services-details">
            <div className="section-header">
              <h3>Como funciona o atendimento</h3>
              <p>Informações importantes sobre o processo terapêutico</p>
            </div>

            <div className="details-grid">
              <div className="detail-card">
                <div className="detail-icon">🕐</div>
                <h4>Duração</h4>
                <p>Sessões de 50 minutos</p>
              </div>

              <div className="detail-card">
                <div className="detail-icon">📅</div>
                <h4>Frequência</h4>
                <p>Geralmente semanal, ajustada conforme sua necessidade</p>
              </div>

              <div className="detail-card">
                <div className="detail-icon">💻</div>
                <h4>Modalidade</h4>
                <p>Atendimento exclusivamente online via videochamada</p>
              </div>

              <div className="detail-card">
                <div className="detail-icon">🔒</div>
                <h4>Sigilo</h4>
                <p>Confidencialidade absoluta garantida</p>
              </div>

              <div className="detail-card">
                <div className="detail-icon">📋</div>
                <h4>Primeira Consulta</h4>
                <p>Acolhimento inicial e definição de objetivos</p>
              </div>
            </div>

            <div className="process-flow">
              <h4>Como começar seu processo terapêutico:</h4>
              <div className="flow-steps">
                <div className="flow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h5>Primeiro Contato</h5>
                    <p>Entre em contato via WhatsApp</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h5>Agendamento</h5>
                    <p>Escolhemos o melhor horário</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h5>Primeira Sessão</h5>
                    <p>Acolhimento e planejamento</p>
                  </div>
                </div>
                <div className="flow-arrow">→</div>
                <div className="flow-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h5>Acompanhamento</h5>
                    <p>Processo terapêutico contínuo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="blog-section">
        <div className="hp_container">
          <div className="section-header">
            <span className="section-tag">Blog</span>
            <h2>Artigos sobre saúde mental</h2>
            <p>Textos curtos para ajudar no seu dia a dia</p>
          </div>

          <div className="blog-grid">
            {latestPosts.length > 0 ? (
              latestPosts.map((post, index) => (
                <article key={post.id} className={`blog-card ${index === 0 ? 'featured' : ''}`}>
                  {index === 0 && <div className="blog-tag">Recente</div>}
                  {post.post_tags && post.post_tags.length > 0 && index > 0 && (
                    <div className="blog-tag">{post.post_tags[0].tags.name}</div>
                  )}
                  <h3>{post.title}</h3>
                  <p>{post.summary || 'Clique para ler o artigo completo.'}</p>
                  <Link href={`/blog/${post.slug}`} className="read-more">Ler mais →</Link>
                </article>
              ))
            ) : (
              <article className="blog-card featured">
                <div className="blog-tag">Em breve</div>
                <h3>Novos artigos chegando</h3>
                <p>Em breve, novos conteúdos sobre saúde mental, relacionamentos e crescimento pessoal estarão disponíveis aqui.</p>
                <Link href="/blog" className="read-more">Ver blog →</Link>
              </article>
            )}
          </div>

          <div className="blog-cta">
            <Link href="/blog" className="btn-outline">Ver todos os artigos</Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <div className="hp_container">
          <div className="cta-content">
            <h2>Dê o primeiro passo no seu processo de cuidado emocional</h2>
            <p>Estou aqui para acompanhar você em um espaço seguro e acolhedor. Entre em contato e vamos conversar sobre como posso ajudar.</p>
            <a href="https://wa.me/5511997145238" className="btn-cta">
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}