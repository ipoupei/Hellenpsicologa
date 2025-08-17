/* src/pages/AboutPage.jsx */
export default function AboutPage() {
  return (
    <div className="hp_section">
      <div className="hp_container">
        {/* Hero da página Sobre */}
        <div className="hp_center hp_mb-8">
          <span className="hp_eyebrow">Sobre mim</span>
          <h1 className="hp_heading">
            Olá, eu sou a Hellen
          </h1>
          <p className="hp_lead hp_muted">
            Psicóloga especializada em atendimento online para profissionais que buscam equilibrar vida pessoal e carreira.
          </p>
        </div>

        <div className="hp_grid hp_grid-2 hp_mb-8">
          {/* Coluna da imagem - placeholder por enquanto */}
          <div className="hp_card">
            <div className="hp_card__body hp_center">
              <div style={{
                width: '100%', 
                height: '300px', 
                backgroundColor: 'var(--hp-color-bg)', 
                borderRadius: 'var(--hp-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--hp-color-text-muted)'
              }}>
                [Foto da Hellen]
              </div>
            </div>
          </div>

          {/* Coluna do texto */}
          <div>
            <h2 className="hp_subheading hp_mb-4">Minha trajetória</h2>
            
            <div className="hp_stack">
              <p className="hp_text">
                Com mais de 8 anos de experiência em psicologia, dedico minha carreira a ajudar profissionais a encontrarem equilíbrio entre suas demandas corporativas e bem-estar pessoal.
              </p>
              
              <p className="hp_text">
                Antes de me especializar em atendimento online, trabalhei por 5 anos em grandes corporações, onde pude compreender de perto os desafios únicos que líderes e gestores enfrentam no dia a dia.
              </p>
              
              <p className="hp_text">
                Esta experiência me permite oferecer um olhar diferenciado, combinando conhecimento técnico em psicologia com a compreensão prática do ambiente corporativo.
              </p>
            </div>
          </div>
        </div>

        {/* Seção de Credenciais */}
        <div className="hp_section--alt hp_py-6" style={{borderRadius: 'var(--hp-radius-lg)'}}>
          <div className="hp_center hp_mb-5">
            <h2 className="hp_subheading">Formação e credenciais</h2>
          </div>
          
          <div className="hp_grid hp_grid-2">
            <div>
              <h3 className="hp_mb-3">Formação acadêmica</h3>
              <ul className="hp_list hp_list--check">
                <li>Graduação em Psicologia - Universidade de São Paulo (USP)</li>
                <li>Especialização em Psicologia Organizacional</li>
                <li>Pós-graduação em Terapia Cognitivo-Comportamental</li>
                <li>Formação em Atendimento Online</li>
              </ul>
            </div>
            
            <div>
              <h3 className="hp_mb-3">Registro profissional</h3>
              <ul className="hp_list hp_list--check">
                <li>CRP 06/123456 - Conselho Regional de Psicologia</li>
                <li>Certificação em Atendimento Psicológico Online</li>
                <li>Membro da Associação Brasileira de Psicologia</li>
                <li>Formação continuada em Psicologia Positiva</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção Abordagem */}
        <div className="hp_section">
          <div className="hp_center hp_mb-6">
            <h2 className="hp_heading">Minha abordagem</h2>
            <p className="hp_lead hp_muted">
              Como trabalho para ajudar você a alcançar seus objetivos
            </p>
          </div>
          
          <div className="hp_grid hp_grid-3">
            <div className="hp_card">
              <div className="hp_card__body hp_center">
                <div className="hp_feature__icon hp_mb-4">🎯</div>
                <h3 className="hp_feature__title">Foco prático</h3>
                <p className="hp_feature__desc">
                  Estratégias concretas que você pode aplicar no seu dia a dia profissional e pessoal.
                </p>
              </div>
            </div>
            
            <div className="hp_card">
              <div className="hp_card__body hp_center">
                <div className="hp_feature__icon hp_mb-4">🤝</div>
                <h3 className="hp_feature__title">Ambiente acolhedor</h3>
                <p className="hp_feature__desc">
                  Espaço seguro e sem julgamentos para você explorar seus desafios e potenciais.
                </p>
              </div>
            </div>
            
            <div className="hp_card">
              <div className="hp_card__body hp_center">
                <div className="hp_feature__icon hp_mb-4">⚡</div>
                <h3 className="hp_feature__title">Resultados sustentáveis</h3>
                <p className="hp_feature__desc">
                  Mudanças duradouras que se integram naturalmente à sua rotina e objetivos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hp_cta_bar">
          <div className="hp_center">
            <h2 className="hp_mb-4">Vamos conversar?</h2>
            <p className="hp_mb-5">
              Agende uma primeira conversa para conhecermos melhor suas necessidades e como posso ajudar.
            </p>
            <a href="https://wa.me/5511999999999" className="hp_btn hp_btn--primary hp_btn--lg">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}