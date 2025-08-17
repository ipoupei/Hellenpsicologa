/* src/App.jsx */
import { Routes, Route } from 'react-router-dom'
import Header from './shared/components/Header'
import Footer from './shared/components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'

function App() {
 return (
   <>
     <Header />
     <main>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/about" element={<AboutPage />} />
         <Route path="/services" element={<ServicesPage />} />
         <Route path="/blog" element={<BlogPage />} />
         <Route path="/contact" element={<ContactPage />} />

       </Routes>
     </main>
     <Footer />
   </>
 )
}

export default App