import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Hellen Psicóloga - Transforme seu casulo em borboleta',
  description: 'Psicologia clínica para ansiedade, autoestima e relacionamentos. Agende sua sessão e transforme seu casulo em borboleta.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />

        {/* Botão Flutuante WhatsApp */}
        <a
          href="https://wa.me/5511997145238?text=Olá! Gostaria de agendar uma sessão."
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
        >
          <span>💬</span>
        </a>
      </body>
    </html>
  )
}