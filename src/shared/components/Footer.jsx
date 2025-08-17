import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="hp_footer">
      <div className="hp_container">
        <div className="hp_footer__cols">
          <div>
            <h4>Hellen Psicologia</h4>
            <p>Atendimento psicológico online para profissionais que buscam equilíbrio entre vida pessoal e profissional.</p>
          </div>
          
          <div>
            <h4>Links Rápidos</h4>
            <ul className="hp_list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">Sobre</Link></li>
              <li><Link to="#">Serviços</Link></li>
              <li><Link to="#">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4>Contato</h4>
            <ul className="hp_list">
              <li>WhatsApp: (11) 99999-9999</li>
              <li>E-mail: contato@hellenpsicologa.com</li>
              <li>Atendimento online</li>
            </ul>
          </div>
          
          <div>
            <h4>Legal</h4>
            <ul className="hp_list">
              <li><Link to="/privacy">Política de Privacidade</Link></li>
              <li><Link to="/terms">Termos de Uso</Link></li>
              <li>CRP: 06/123456</li>
            </ul>
          </div>
        </div>
        
        <div className="hp_footer__note">
          <p>&copy; 2025 Hellen Psicologia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}