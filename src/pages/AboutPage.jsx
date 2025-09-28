/* src/pages/AboutPage.jsx */
export default function AboutPage() {
  return (
    <div className="hp_section">
      <div className="hp_container">
        {/* Hero da página Sobre */}
        <div className="hp_center hp_mb-8">
          <span className="hp_eyebrow">Sobre mim</span>
          <h1 className="hp_heading">
            Hellen Brandão
          </h1>
          <p className="hp_lead hp_muted">
            Psicóloga formada desde 2013, especializada em atendimento psicológico online.
          </p>
        </div>

        <div className="hp_grid hp_grid-2 hp_mb-8">
          {/* Coluna da imagem */}
          <div className="hp_card">
            <div className="hp_card__body hp_center">
              <div style={{
                width: '300px',
                height: '300px',
                backgroundColor: 'var(--hp-color-bg)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '4px solid var(--hp-color-primary)',
                margin: '0 auto'
              }}>
                <span style={{fontSize: '8rem'}}>👩‍⚕️</span>
              </div>
            </div>
          </div>

          {/* Coluna do texto */}
          <div>
            <h2 className="hp_subheading hp_mb-4">Minha trajetória na psicologia</h2>

            <div className="hp_stack">
              <p className="hp_text">
                Olá, sou Hellen Brandão, psicóloga formada desde 2013.
              </p>

              <p className="hp_text">
                Minha trajetória na psicologia é marcada pela escuta atenta e pela crença de que cada pessoa carrega uma história única e merece um espaço de confiança para compartilhar suas dores, conquistas e sonhos.
              </p>

              <p className="hp_text">
                Nos atendimentos, já acompanhei pessoas em diferentes momentos: ansiedade, baixa autoestima, dificuldades nos relacionamentos, sobrecarga no trabalho e fases de transição. Meu propósito é oferecer um espaço sem julgamentos, onde você possa se sentir à vontade para olhar para si e construir caminhos de maior bem-estar emocional.
              </p>

              <div className="hp_mb-5" style={{padding: '1.5rem', backgroundColor: 'var(--hp-color-primary)', borderRadius: 'var(--hp-radius-lg)', color: 'white', textAlign: 'center'}}>
                <p style={{margin: 0, fontSize: 'var(--hp-text-lg)', fontWeight: 'var(--hp-font-medium)'}}>
                  💜 Acredito que a terapia é um processo de autoconhecimento, fortalecimento e transformação.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Informações Profissionais */}
        <div className="hp_section--alt hp_py-6" style={{borderRadius: 'var(--hp-radius-lg)'}}>
          <div className="hp_center hp_mb-5">
            <h2 className="hp_subheading">Informações Profissionais</h2>
          </div>

          <div className="hp_grid hp_grid-2">
            <div>
              <h3 className="hp_mb-3">Formação e Registro</h3>
              <ul className="hp_list hp_list--check">
                <li>Psicóloga formada desde 2013</li>
                <li>Especialização em atendimento psicológico online</li>
                <li>Formação continuada em saúde mental</li>
                <li>Atualização constante em técnicas terapêuticas</li>
              </ul>
            </div>

            <div>
              <h3 className="hp_mb-3">Áreas de Especialização</h3>
              <ul className="hp_list hp_list--check">
                <li>Ansiedade e transtornos relacionados</li>
                <li>Autoestima e desenvolvimento pessoal</li>
                <li>Relacionamentos interpessoais</li>
                <li>Orientação para adolescentes e adultos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção Abordagem */}
        <div className="hp_section">
          <div className="hp_center hp_mb-6">
            <h2 className="hp_heading">Como trabalho</h2>
            <p className="hp_lead hp_muted">
              Minha abordagem no atendimento psicológico
            </p>
          </div>

          <div className="hp_grid hp_grid-3">
            <div className="hp_card">
              <div className="hp_card__body hp_center">
                <div className="hp_feature__icon hp_mb-4">👂</div>
                <h3 className="hp_feature__title">Escuta atenta</h3>
                <p className="hp_feature__desc">
                  Ofereço um espaço de escuta sem julgamentos, onde sua história é acolhida com respeito e cuidado.
                </p>
              </div>
            </div>

            <div className="hp_card">
              <div className="hp_card__body hp_center">
                <div className="hp_feature__icon hp_mb-4">🛡️</div>
                <h3 className="hp_feature__title">Ambiente seguro</h3>
                <p className="hp_feature__desc">
                  Espaço confidencial e acolhedor para você se sentir à vontade para explorar seus sentimentos.
                </p>
              </div>
            </div>

            <div className="hp_card">
              <div className="hp_card__body hp_center">
                <div className="hp_feature__icon hp_mb-4">🌱</div>
                <h3 className="hp_feature__title">Crescimento pessoal</h3>
                <p className="hp_feature__desc">
                  Processo de autoconhecimento e fortalecimento para construir caminhos de bem-estar emocional.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="hp_cta_bar">
          <div className="hp_center">
            <h2 className="hp_mb-4">Pronta para te acompanhar</h2>
            <p className="hp_mb-5">
              Estou aqui para oferecer um espaço de cuidado e acolhimento. Entre em contato e vamos conversar sobre como posso ajudar você.
            </p>
            <a href="https://wa.me/5511997145238" className="hp_btn hp_btn--primary hp_btn--lg">
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}