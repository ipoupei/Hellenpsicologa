import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hp_hero">
        <div className="hp_container">
          <h1 className="hp_hero__title">
            Equilibre sua vida profissional e pessoal com apoio psicológico online
          </h1>
          
          <p className="hp_hero__subtitle">
            Atendimento acolhedor, prático e confidencial para quem vive o ritmo da liderança.
          </p>
          
          <div className="hp_cluster hp_center">
            <a href="#" className="hp_btn hp_btn--primary hp_btn--lg">
              Agendar primeira conversa
            </a>
            
            <Link to="#" className="hp_btn hp_btn--ghost">
              Saiba mais
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Serviços */}
      <section className="hp_section hp_section--alt">
        <div className="hp_container">
          <div className="hp_center hp_mb-6">
            <span className="hp_eyebrow">Como posso ajudar</span>
            <h2 className="hp_heading">
              Áreas de atuação
            </h2>
            <p className="hp_lead hp_muted">
              Atendimento especializado para os principais desafios de quem ocupa posições de liderança.
            </p>
          </div>
          
          <div className="hp_grid hp_grid-3">
            {/* Card 1 */}
            <div className="hp_card">
              <div className="hp_card__body">
                <div className="hp_feature">
                  <div className="hp_feature__icon">
                    ⚡
                  </div>
                  
                  <h3 className="hp_feature__title">
                    Estresse e ansiedade no trabalho
                  </h3>
                  
                  <p className="hp_feature__desc">
                    Recupere clareza para decidir melhor e reduza o impacto do estresse na sua performance profissional.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="hp_card">
              <div className="hp_card__body">
                <div className="hp_feature">
                  <div className="hp_feature__icon">
                    ⚖️
                  </div>
                  
                  <h3 className="hp_feature__title">
                    Equilíbrio vida-trabalho
                  </h3>
                  
                  <p className="hp_feature__desc">
                    Crie limites saudáveis e rotinas sustentáveis que permitam sucesso profissional sem sacrificar sua vida pessoal.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="hp_card">
              <div className="hp_card__body">
                <div className="hp_feature">
                  <div className="hp_feature__icon">
                    👨‍👩‍👧‍👦
                  </div>
                  
                  <h3 className="hp_feature__title">
                    Desafios familiares
                  </h3>
                  
                  <p className="hp_feature__desc">
                    Melhore a comunicação, fortaleça vínculos e torne a convivência familiar mais leve e harmoniosa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Blog Preview */}
      <section className="hp_section">
        <div className="hp_container">
          <div className="hp_center hp_mb-6">
            <span className="hp_eyebrow">Blog</span>
            <h2 className="hp_heading">
              Conteúdos que ajudam no seu dia a dia
            </h2>
            <p className="hp_lead hp_muted">
              Dicas práticas e insights para lidar melhor com os desafios da vida profissional.
            </p>
          </div>
          
          <div className="hp_grid hp_grid-3">
            {/* Post 1 */}
            <article className="hp_card">
              <div className="hp_card__body">
                <div className="hp_postmeta hp_mb-3">
                  <span className="hp_tag">15 de Agosto, 2025</span>
                </div>
                
                <h3 className="hp_mb-3">
                  <Link to="#" className="hp_link">
                    Três sinais de que o estresse no trabalho está passando do limite
                  </Link>
                </h3>
                
                <p className="hp_text hp_muted hp_mb-4">
                  Reconheça os sintomas antes que afetem sua saúde e produtividade.
                </p>
                
                <Link to="#" className="hp_link">
                  Ler mais →
                </Link>
              </div>
            </article>

            {/* Post 2 */}
            <article className="hp_card">
              <div className="hp_card__body">
                <div className="hp_postmeta hp_mb-3">
                  <span className="hp_tag">10 de Agosto, 2025</span>
                </div>
                
                <h3 className="hp_mb-3">
                  <Link to="#" className="hp_link">
                    Limites saudáveis: como dizer 'não' sem culpa
                  </Link>
                </h3>
                
                <p className="hp_text hp_muted hp_mb-4">
                  Estratégias práticas para estabelecer limites profissionais sem comprometer relacionamentos.
                </p>
                
                <Link to="#" className="hp_link">
                  Ler mais →
                </Link>
                </div>
            </article>

            {/* Post 3 */}
            <article className="hp_card">
              <div className="hp_card__body">
                <div className="hp_postmeta hp_mb-3">
                  <span className="hp_tag">5 de Agosto, 2025</span>
                </div>
                
                <h3 className="hp_mb-3">
                  <Link to="#" className="hp_link">
                    Ansiedade e produtividade: como quebrar o ciclo
                  </Link>
                </h3>
                
                <p className="hp_text hp_muted hp_mb-4">
                  Entenda a relação entre ansiedade e performance no trabalho e como encontrar equilíbrio.
                </p>
                
                <Link to="#" className="hp_link">
                  Ler mais →
                </Link>
                </div>
            </article>
          </div>
          
          <div className="hp_center hp_mt-6">
            <Link to="#" className="hp_btn hp_btn--ghost">
              Ver todos os artigos
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="hp_cta_bar">
        <div className="hp_container">
          <div className="hp_center">
            <h2 className="hp_mb-4">Pronto para dar o primeiro passo?</h2>
            <p className="hp_mb-5">
              Agende uma conversa inicial sem compromisso e vamos conversar sobre como posso ajudar você.
            </p>
            <a href="https://wa.me/5511999999999" className="hp_btn hp_btn--secondary hp_btn--lg">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}