'use client'

import { useState } from 'react'

export default function ContactPage() {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   phone: '',
   subject: '',
   message: ''
 })

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   })
 }

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault()
   // Por enquanto só um console.log, depois integraremos com backend
   console.log('Formulário enviado:', formData)
   alert('Mensagem enviada! Retornarei o contato em breve.')

   // Limpar formulário
   setFormData({
     name: '',
     email: '',
     phone: '',
     subject: '',
     message: ''
   })
 }

 return (
   <div className="hp_section">
     <div className="hp_container">
       {/* Hero da página Contato */}
       <div className="hp_center hp_mb-8">
         <span className="hp_eyebrow">Contato</span>
         <h1 className="hp_heading">
           Vamos conversar?
         </h1>
         <p className="hp_lead hp_muted">
           Entre em contato para agendar sua primeira conversa ou esclarecer dúvidas.
         </p>
       </div>

       <div className="hp_grid hp_grid-2">
         {/* Formulário */}
         <div>
           <div className="hp_card">
             <div className="hp_card__header">
               <h2 className="hp_subheading hp_mb-0">Envie uma mensagem</h2>
             </div>

             <div className="hp_card__body">
               <form className="hp_form" onSubmit={handleSubmit}>
                 <div className="hp_form__row">
                   <label htmlFor="name" className="hp_label">
                     Nome completo *
                   </label>
                   <input
                     type="text"
                     id="name"
                     name="name"
                     className="hp_input"
                     value={formData.name}
                     onChange={handleChange}
                     required
                   />
                 </div>

                 <div className="hp_form__row">
                   <label htmlFor="email" className="hp_label">
                     E-mail *
                   </label>
                   <input
                     type="email"
                     id="email"
                     name="email"
                     className="hp_input"
                     value={formData.email}
                     onChange={handleChange}
                     required
                   />
                 </div>

                 <div className="hp_form__row">
                   <label htmlFor="phone" className="hp_label">
                     Telefone/WhatsApp
                   </label>
                   <input
                     type="tel"
                     id="phone"
                     name="phone"
                     className="hp_input"
                     placeholder="(11) 99999-9999"
                     value={formData.phone}
                     onChange={handleChange}
                   />
                 </div>

                 <div className="hp_form__row">
                   <label htmlFor="subject" className="hp_label">
                     Assunto
                   </label>
                   <select
                     id="subject"
                     name="subject"
                     className="hp_select"
                     value={formData.subject}
                     onChange={handleChange}
                   >
                     <option value="">Selecione um assunto</option>
                     <option value="primeira-conversa">Primeira conversa</option>
                     <option value="informacoes">Solicitar informações</option>
                     <option value="agendamento">Agendamento</option>
                     <option value="outro">Outro</option>
                   </select>
                 </div>

                 <div className="hp_form__row">
                   <label htmlFor="message" className="hp_label">
                     Mensagem *
                   </label>
                   <textarea
                     id="message"
                     name="message"
                     className="hp_textarea"
                     placeholder="Conte um pouco sobre o que você gostaria de conversar..."
                     value={formData.message}
                     onChange={handleChange}
                     required
                   />
                   <span className="hp_help">
                     Fique à vontade para compartilhar suas expectativas ou dúvidas.
                   </span>
                 </div>

                 <button type="submit" className="hp_btn hp_btn--primary hp_btn--block">
                   Enviar mensagem
                 </button>
               </form>
             </div>
           </div>
         </div>

         {/* Informações de contato */}
         <div>
           <div className="hp_stack">
             {/* WhatsApp */}
             <div className="hp_card">
               <div className="hp_card__body">
                 <div className="hp_feature">
                   <div className="hp_feature__icon">📱</div>
                   <h3 className="hp_feature__title">WhatsApp</h3>
                   <p className="hp_feature__desc hp_mb-4">
                     Forma mais rápida de entrar em contato e agendar sua primeira conversa.
                   </p>
                   <a
                     href="https://wa.me/5511997145238?text=Olá! Gostaria de agendar uma primeira conversa."
                     className="hp_btn hp_btn--secondary hp_btn--block"
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     Falar no WhatsApp
                   </a>
                 </div>
               </div>
             </div>

             {/* E-mail */}
             <div className="hp_card">
               <div className="hp_card__body">
                 <div className="hp_feature">
                   <div className="hp_feature__icon">✉️</div>
                   <h3 className="hp_feature__title">E-mail</h3>
                   <p className="hp_feature__desc hp_mb-4">
                     Para dúvidas ou informações mais detalhadas.
                   </p>
                   <a
                     href="mailto:contato@hellenpsicologa.com"
                     className="hp_btn hp_btn--ghost hp_btn--block"
                   >
                     contato@hellenpsicologa.com
                   </a>
                 </div>
               </div>
             </div>

             {/* Horário de atendimento */}
             <div className="hp_card">
               <div className="hp_card__body">
                 <div className="hp_feature">
                   <div className="hp_feature__icon">🕐</div>
                   <h3 className="hp_feature__title">Horário de atendimento</h3>
                   <div className="hp_feature__desc">
                     <p><strong>Segunda a sexta:</strong> 8h às 18h</p>
                     <p><strong>Sábados:</strong> 8h às 12h</p>
                     <p><strong>Domingos:</strong> Não atendo</p>
                     <p className="hp_text hp_muted hp_mt-3">
                       * Horários flexíveis para profissionais com agenda apertada
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Informações adicionais */}
       <div className="hp_section--alt hp_py-6 hp_mt-8" style={{borderRadius: 'var(--hp-radius-lg)'}}>
         <div className="hp_center">
           <h2 className="hp_subheading hp_mb-4">Algumas informações importantes</h2>

           <div className="hp_grid hp_grid-3">
             <div className="hp_center">
               <div className="hp_feature__icon hp_mb-3">🔒</div>
               <h4 className="hp_mb-2">Sigilo profissional</h4>
               <p className="hp_text hp_muted">
                 Todas as informações são tratadas com absoluto sigilo conforme código de ética.
               </p>
             </div>

             <div className="hp_center">
               <div className="hp_feature__icon hp_mb-3">💻</div>
               <h4 className="hp_mb-2">Atendimento online</h4>
               <p className="hp_text hp_muted">
                 Sessões por videochamada em plataforma segura e privada.
               </p>
             </div>

             <div className="hp_center">
               <div className="hp_feature__icon hp_mb-3">⏱️</div>
               <h4 className="hp_mb-2">Resposta rápida</h4>
               <p className="hp_text hp_muted">
                 Retorno em até 24h nos dias úteis.
               </p>
             </div>
           </div>
         </div>
       </div>

       {/* CTA */}
       <div className="hp_cta_bar">
         <div className="hp_center">
           <h2 className="hp_mb-4">Primeira conversa sem compromisso</h2>
           <p className="hp_mb-5">
             Que tal começarmos com uma conversa inicial para nos conhecermos e esclarecer suas dúvidas?
           </p>
           <a
             href="https://wa.me/5511997145238?text=Olá! Gostaria de agendar uma primeira conversa sem compromisso."
             className="hp_btn hp_btn--primary hp_btn--lg"
             target="_blank"
             rel="noopener noreferrer"
           >
             Agendar primeira conversa
           </a>
         </div>
       </div>
     </div>
   </div>
 )
}