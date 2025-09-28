import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="hp_footer">
      <div className="hp_container">
        <div className="hp_footer__cols">
          <div>
            <h4>Hellen Brandão</h4>
            <p>Psicóloga especializada em atendimento online para ansiedade, relacionamentos, autoestima e desafios da vida.</p>
          </div>
          
          <div>
            <h4>Links Rápidos</h4>
            <ul className="hp_list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Sobre Mim</Link></li>
              <li><Link to="/services">Serviços</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contato</Link></li>
            </ul>
          </div>
          
          <div>
            <h4>Contato</h4>
            <ul className="hp_list">
              <li>WhatsApp: (11) 99714-5238</li>
              <li>E-mail: [a inserir]</li>
              <li>Atendimento online</li>
            </ul>
          </div>
          
          <div>
            <h4>Legal</h4>
            <ul className="hp_list">
              <li><Link to="/privacy">Política de Privacidade</Link></li>
              <li><Link to="/terms">Termos de Uso</Link></li>
              <li>CRP: 06/121942</li>
            </ul>
          </div>
        </div>
        
        <div className="hp_footer__note">
          <p>&copy; 2025 Hellen Brandão – Psicóloga (CRP 06/121942). Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}