'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="hp_nav">
      <div className="hp_container">
        <nav className="hp_nav">
          <div className="nav-brand-section">
            <Link href="/">
              <Image
                src="/Logo.png"
                alt="Hellen Brandão - Psicóloga"
                className="logo"
                width={400}
                height={128}
                priority
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Link>
          </div>

          <ul className="hp_nav__links">
            <li><Link href="/" className="hp_nav__link">Home</Link></li>
            <li><Link href="/sobre" className="hp_nav__link">Sobre Mim</Link></li>
            <li><Link href="/servicos" className="hp_nav__link">Serviços</Link></li>
            <li><Link href="/blog" className="hp_nav__link">Blog</Link></li>
            <li><Link href="/contato" className="hp_nav__link">Agende sua Sessão</Link></li>
          </ul>

          <div className="hp_nav__cta">
            <a
              href="https://wa.me/5511997145238?text=Olá! Gostaria de agendar uma sessão."
              className="hp_btn hp_btn--primary hp_btn--sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contato
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}