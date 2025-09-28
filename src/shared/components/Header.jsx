/* src/shared/components/Header.jsx */
import { Link } from 'react-router-dom'
import logoImage from '../../public/Logo.png'

export default function Header() {
 return (
   <header className="hp_nav">
     <div className="hp_container">
       <nav className="hp_nav">
         <div className="nav-brand-section">
           <img src={logoImage} alt="Hellen Psicologia" className="logo" />            

         </div>
         
         <ul className="hp_nav__links">
           <li><Link to="/" className="hp_nav__link">Home</Link></li>
           <li><Link to="/about" className="hp_nav__link">Sobre Mim</Link></li>
           <li><Link to="/services" className="hp_nav__link">Serviços</Link></li>
           <li><Link to="/blog" className="hp_nav__link">Blog</Link></li>
           <li><Link to="/contact" className="hp_nav__link">Agende sua Sessão</Link></li>
         </ul>
         
         <div className="hp_nav__cta">
           <a href="https://wa.me/5511997145238?text=Olá! Gostaria de agendar uma sessão." 
              className="hp_btn hp_btn--primary hp_btn--sm"
              target="_blank"
              rel="noopener noreferrer">
             Contato
           </a>
         </div>
       </nav>
     </div>
   </header>
 )
}