/* src/shared/components/Header.jsx */
import { Link } from 'react-router-dom'

export default function Header() {
 return (
   <header className="hp_nav">
     <div className="hp_container">
       <nav className="hp_nav">
         <Link to="/" className="hp_nav__brand">
           Hellen Psicologia
         </Link>
         
         <ul className="hp_nav__links">
           <li><Link to="/" className="hp_nav__link">Home</Link></li>
           <li><Link to="/about" className="hp_nav__link">Sobre</Link></li>
           <li><Link to="/services" className="hp_nav__link">Serviços</Link></li>
           <li><Link to="/blog" className="hp_nav__link">Blog</Link></li>
           <li><Link to="/contact" className="hp_nav__link">Contato</Link></li>
         </ul>
         
         <div className="hp_nav__cta">
           <a href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma conversa." 
              className="hp_btn hp_btn--primary hp_btn--sm"
              target="_blank"
              rel="noopener noreferrer">
             Agendar Conversa
           </a>
         </div>
       </nav>
     </div>
   </header>
 )
}