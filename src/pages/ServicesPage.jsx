/* src/pages/ServicesPage.jsx */
export default function ServicesPage() {
 return (
   <div className="hp_section">
     <div className="hp_container">
       {/* Hero da página Serviços */}
       <div className="hp_center hp_mb-8">
         <span className="hp_eyebrow">Serviços</span>
         <h1 className="hp_heading">
           Como funciona a terapia online
         </h1>
         <p className="hp_lead hp_muted">
           Atendimento psicológico profissional, prático e confidencial no conforto do seu ambiente.
         </p>
       </div>

       {/* Como funciona */}
       <div className="hp_section--alt hp_py-6 hp_mb-8" style={{borderRadius: 'var(--hp-radius-lg)'}}>
         <div className="hp_center hp_mb-6">
           <h2 className="hp_subheading">Como funciona</h2>
           <p className="hp_text hp_muted">
             Processo simples e acolhedor para você começar sua jornada de autoconhecimento
           </p>
         </div>
         
         <div className="hp_grid hp_grid-3">
           <div className="hp_center">
             <div className="hp_feature__icon hp_mb-4">1️⃣</div>
             <h3 className="hp_feature__title">Primeiro contato</h3>
             <p className="hp_feature__desc">
               Entre em contato pelo WhatsApp ou formulário. Vamos agendar uma conversa inicial para nos conhecermos.
             </p>
           </div>
           
           <div className="hp_center">
             <div className="hp_feature__icon hp_mb-4">2️⃣</div>
             <h3 className="hp_feature__title">Sessão inicial</h3>
             <p className="hp_feature__desc">
               Conversamos sobre seus objetivos, desafios e expectativas. Definimos juntos o melhor caminho.
             </p>
           </div>
           
           <div className="hp_center">
             <div className="hp_feature__icon hp_mb-4">3️⃣</div>
             <h3 className="hp_feature__title">Acompanhamento</h3>
             <p className="hp_feature__desc">
               Sessões regulares focadas nos seus objetivos, com estratégias práticas e apoio contínuo.
             </p>
           </div>
         </div>
       </div>

       {/* Áreas de atuação detalhadas */}
       <div className="hp_mb-8">
         <div className="hp_center hp_mb-6">
           <h2 className="hp_heading">Áreas de atuação</h2>
           <p className="hp_lead hp_muted">
             Especializada nos principais desafios de profissionais em posições de liderança
           </p>
         </div>
         
         <div className="hp_stack">
           {/* Área 1 */}
           <div className="hp_card">
             <div className="hp_card__body">
               <div className="hp_grid hp_grid-2">
                 <div>
                   <div className="hp_feature__icon hp_mb-3">⚡</div>
                   <h3 className="hp_feature__title hp_mb-3">
                     Estresse e ansiedade no trabalho
                   </h3>
                   <p className="hp_feature__desc hp_mb-4">
                     Recupere clareza mental, tome decisões com mais confiança e reduza o impacto do estresse na sua performance e saúde.
                   </p>
                 </div>
                 <div>
                   <h4 className="hp_mb-3">Trabalhamos juntos:</h4>
                   <ul className="hp_list hp_list--check">
                     <li>Técnicas de gestão do estresse</li>
                     <li>Estratégias para lidar com pressão</li>
                     <li>Melhoria na tomada de decisões</li>
                     <li>Desenvolvimento de resiliência</li>
                     <li>Prevenção do burnout</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>

           {/* Área 2 */}
           <div className="hp_card">
             <div className="hp_card__body">
               <div className="hp_grid hp_grid-2">
                 <div>
                   <div className="hp_feature__icon hp_mb-3">⚖️</div>
                   <h3 className="hp_feature__title hp_mb-3">
                     Equilíbrio vida-trabalho
                   </h3>
                   <p className="hp_feature__desc hp_mb-4">
                     Crie limites saudáveis e rotinas sustentáveis que permitam sucesso profissional sem sacrificar sua vida pessoal.
                   </p>
                 </div>
                 <div>
                   <h4 className="hp_mb-3">Trabalhamos juntos:</h4>
                   <ul className="hp_list hp_list--check">
                     <li>Estabelecimento de limites profissionais</li>
                     <li>Organização de prioridades</li>
                     <li>Gestão eficaz do tempo</li>
                     <li>Rotinas de autocuidado</li>
                     <li>Comunicação assertiva</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>

           {/* Área 3 */}
           <div className="hp_card">
             <div className="hp_card__body">
               <div className="hp_grid hp_grid-2">
                 <div>
                   <div className="hp_feature__icon hp_mb-3">👨‍👩‍👧‍👦</div>
                   <h3 className="hp_feature__title hp_mb-3">
                     Desafios familiares
                   </h3>
                   <p className="hp_feature__desc hp_mb-4">
                     Melhore a comunicação, fortaleça vínculos e torne a convivência familiar mais leve e harmoniosa.
                   </p>
                 </div>
                 <div>
                   <h4 className="hp_mb-3">Trabalhamos juntos:</h4>
                   <ul className="hp_list hp_list--check">
                     <li>Melhoria da comunicação familiar</li>
                     <li>Resolução de conflitos</li>
                     <li>Fortalecimento de vínculos</li>
                     <li>Gestão de mudanças familiares</li>
                     <li>Conciliação família-carreira</li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* FAQ */}
       <div className="hp_mb-8">
         <div className="hp_center hp_mb-6">
           <h2 className="hp_heading">Perguntas frequentes</h2>
         </div>
         
         <div className="hp_stack">
           <div className="hp_card">
             <div className="hp_card__body">
               <h3 className="hp_mb-3">Como funciona o atendimento online?</h3>
               <p className="hp_text">
                 As sessões são realizadas por videochamada em plataforma segura e confidencial. Você precisa apenas de um dispositivo com internet, câmera e microfone, em um ambiente privado e confortável.
               </p>
             </div>
           </div>
           
           <div className="hp_card">
             <div className="hp_card__body">
               <h3 className="hp_mb-3">Qual a duração e frequência das sessões?</h3>
               <p className="hp_text">
                 Cada sessão dura 50 minutos. A frequência é definida em conjunto, geralmente semanal ou quinzenal, dependendo das suas necessidades e disponibilidade.
               </p>
             </div>
           </div>
           
           <div className="hp_card">
             <div className="hp_card__body">
               <h3 className="hp_mb-3">O atendimento online é seguro e confidencial?</h3>
               <p className="hp_text">
                 Sim, totalmente. Utilizo plataformas com criptografia de ponta e sigo rigorosamente o Código de Ética do Psicólogo e a LGPD para garantir total sigilo profissional.
               </p>
             </div>
           </div>
           
           <div className="hp_card">
             <div className="hp_card__body">
               <h3 className="hp_mb-3">Quanto tempo leva para ver resultados?</h3>
               <p className="hp_text">
                 Cada pessoa tem seu próprio ritmo. Alguns clientes relatam mudanças positivas já nas primeiras sessões, enquanto outros precisam de mais tempo. O importante é manter consistência no processo.
               </p>
             </div>
           </div>
           
           <div className="hp_card">
             <div className="hp_card__body">
               <h3 className="hp_mb-3">Como faço para agendar uma sessão?</h3>
               <p className="hp_text">
                 Entre em contato pelo WhatsApp ou formulário de contato. Vamos agendar uma conversa inicial para nos conhecermos e esclarecer todas as suas dúvidas.
               </p>
             </div>
           </div>
         </div>
       </div>

       {/* CTA */}
       <div className="hp_cta_bar">
         <div className="hp_center">
           <h2 className="hp_mb-4">Pronto para começar?</h2>
           <p className="hp_mb-5">
             Agende sua primeira conversa e vamos descobrir juntos como posso ajudar você a alcançar seus objetivos.
           </p>
           <a href="https://wa.me/5511999999999" className="hp_btn hp_btn--primary hp_btn--lg">
             Agendar primeira conversa
           </a>
         </div>
       </div>
     </div>
   </div>
 )
}