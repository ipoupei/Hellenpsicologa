/* src/pages/BlogPage.jsx */
import { Link } from 'react-router-dom'

export default function BlogPage() {
 // Posts fictícios - depois virão do Supabase
 const posts = [
   {
     id: 1,
     title: "Três sinais de que o estresse no trabalho está passando do limite",
     excerpt: "Reconheça os sintomas antes que afetem sua saúde e produtividade. Aprenda a identificar quando é hora de buscar ajuda profissional.",
     date: "15 de Agosto, 2025",
     readTime: "5 min",
     category: "Estresse",
     slug: "tres-sinais-estresse-trabalho"
   },
   {
     id: 2,
     title: "Limites saudáveis: como dizer 'não' sem culpa",
     excerpt: "Estratégias práticas para estabelecer limites profissionais sem comprometer relacionamentos ou sua carreira.",
     date: "10 de Agosto, 2025",
     readTime: "7 min",
     category: "Equilíbrio",
     slug: "limites-saudaveis-dizer-nao"
   },
   {
     id: 3,
     title: "Ansiedade e produtividade: como quebrar o ciclo",
     excerpt: "Entenda a relação entre ansiedade e performance no trabalho e como encontrar equilíbrio para ser mais eficiente.",
     date: "5 de Agosto, 2025",
     readTime: "6 min",
     category: "Ansiedade",
     slug: "ansiedade-produtividade-ciclo"
   },
   {
     id: 4,
     title: "Síndrome do impostor: quando o sucesso gera insegurança",
     excerpt: "Como lidar com a sensação de não merecer suas conquistas profissionais e transformar essa insegurança em crescimento.",
     date: "1 de Agosto, 2025",
     readTime: "8 min",
     category: "Autoestima",
     slug: "sindrome-impostor-sucesso"
   },
   {
     id: 5,
     title: "Comunicação assertiva: lidere com clareza e empatia",
     excerpt: "Desenvolva habilidades de comunicação que fortalecem sua liderança sem comprometer relacionamentos.",
     date: "28 de Julho, 2025",
     readTime: "6 min",
     category: "Liderança",
     slug: "comunicacao-assertiva-lideranca"
   },
   {
     id: 6,
     title: "Home office e saúde mental: criando rotinas saudáveis",
     excerpt: "Estratégias para manter bem-estar emocional e produtividade trabalhando de casa.",
     date: "25 de Julho, 2025",
     readTime: "5 min",
     category: "Equilíbrio",
     slug: "home-office-saude-mental"
   },
   {
     id: 7,
     title: "Burnout em líderes: prevenção e recuperação",
     excerpt: "Como identificar, prevenir e se recuperar do esgotamento profissional em posições de liderança.",
     date: "20 de Julho, 2025",
     readTime: "9 min",
     category: "Burnout",
     slug: "burnout-lideres-prevencao"
   },
   {
     id: 8,
     title: "Família e carreira: encontrando harmonia no caos",
     excerpt: "Dicas práticas para conciliar responsabilidades familiares com ambições profissionais.",
     date: "15 de Julho, 2025",
     readTime: "7 min",
     category: "Família",
     slug: "familia-carreira-harmonia"
   }
 ]

 const categories = ["Todos", "Estresse", "Equilíbrio", "Ansiedade", "Liderança", "Burnout", "Família", "Autoestima"]

 return (
   <div className="hp_section">
     <div className="hp_container">
       {/* Hero da página Blog */}
       <div className="hp_center hp_mb-8">
         <span className="hp_eyebrow">Blog</span>
         <h1 className="hp_heading">
           Conteúdos para o seu desenvolvimento
         </h1>
         <p className="hp_lead hp_muted">
           Artigos, dicas e insights para ajudar você a navegar os desafios da vida profissional e pessoal.
         </p>
       </div>

       {/* Filtros por categoria */}
       <div className="hp_center hp_mb-8">
         <div className="hp_cluster">
           {categories.map((category) => (
             <button
               key={category}
               className={`hp_btn hp_btn--ghost hp_btn--sm ${category === "Todos" ? "hp_btn--primary" : ""}`}
             >
               {category}
             </button>
           ))}
         </div>
       </div>

       {/* Post em destaque */}
       <div className="hp_card hp_mb-8">
         <div className="hp_card__body">
           <div className="hp_grid hp_grid-2">
             <div>
               <div className="hp_postmeta hp_mb-3">
                 <span className="hp_badge">Destaque</span>
                 <span className="hp_tag">{posts[0].category}</span>
                 <span className="hp_muted">•</span>
                 <span className="hp_muted">{posts[0].date}</span>
                 <span className="hp_muted">•</span>
                 <span className="hp_muted">{posts[0].readTime} de leitura</span>
               </div>
               
               <h2 className="hp_subheading hp_mb-3">
                 <Link to={`/blog/${posts[0].slug}`} className="hp_link">
                   {posts[0].title}
                 </Link>
               </h2>
               
               <p className="hp_text hp_muted hp_mb-4">
                 {posts[0].excerpt}
               </p>
               
               <Link to={`/blog/${posts[0].slug}`} className="hp_btn hp_btn--primary">
                 Ler artigo completo →
               </Link>
             </div>
             
             <div className="hp_center">
               <div style={{
                 width: '100%',
                 height: '250px',
                 backgroundColor: 'var(--hp-color-bg)',
                 borderRadius: 'var(--hp-radius-lg)',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 color: 'var(--hp-color-text-muted)'
               }}>
                 [Imagem do artigo]
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Lista de posts */}
       <div className="hp_grid hp_grid-3">
         {posts.slice(1).map(post => (
           <article key={post.id} className="hp_card">
             <div className="hp_card__body">
               {/* Placeholder para imagem */}
               <div className="hp_mb-4" style={{
                 width: '100%',
                 height: '180px',
                 backgroundColor: 'var(--hp-color-bg)',
                 borderRadius: 'var(--hp-radius-md)',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 color: 'var(--hp-color-text-muted)',
                 fontSize: 'var(--hp-text-sm)'
               }}>
                 [Imagem]
               </div>
               
               <div className="hp_postmeta hp_mb-3">
                 <span className="hp_tag">{post.category}</span>
                 <span className="hp_muted">•</span>
                 <span className="hp_muted">{post.date}</span>
                 <span className="hp_muted">•</span>
                 <span className="hp_muted">{post.readTime}</span>
               </div>
               
               <h3 className="hp_mb-3">
                 <Link to={`/blog/${post.slug}`} className="hp_link">
                   {post.title}
                 </Link>
               </h3>
               
               <p className="hp_text hp_muted hp_mb-4">
                 {post.excerpt}
               </p>
               
               <Link to={`/blog/${post.slug}`} className="hp_link">
                 Ler mais →
               </Link>
             </div>
           </article>
         ))}
       </div>

       {/* Paginação */}
       <div className="hp_center hp_mt-8">
         <div className="hp_cluster">
           <button className="hp_btn hp_btn--ghost" disabled>
             ← Anterior
           </button>
           <span className="hp_text hp_muted">Página 1 de 3</span>
           <button className="hp_btn hp_btn--ghost">
             Próxima →
           </button>
         </div>
       </div>

       {/* Newsletter */}
       <div className="hp_section--alt hp_py-6 hp_mt-8" style={{borderRadius: 'var(--hp-radius-lg)'}}>
         <div className="hp_center">
           <h2 className="hp_subheading hp_mb-4">
             Receba conteúdos no seu e-mail
           </h2>
           <p className="hp_text hp_muted hp_mb-5">
             Cadastre-se para receber artigos e dicas exclusivas sobre bem-estar e desenvolvimento profissional.
           </p>
           
           <form className="hp_form" style={{maxWidth: '400px', margin: '0 auto'}}>
             <div className="hp_cluster">
               <input 
                 type="email" 
                 className="hp_input" 
                 placeholder="Seu melhor e-mail"
                 style={{flex: 1}}
               />
               <button type="submit" className="hp_btn hp_btn--primary">
                 Cadastrar
               </button>
             </div>
             <p className="hp_help hp_center hp_mt-2">
               Sem spam. Você pode cancelar a qualquer momento.
             </p>
           </form>
         </div>
       </div>

       {/* CTA */}
       <div className="hp_cta_bar">
         <div className="hp_center">
           <h2 className="hp_mb-4">Gostou do conteúdo?</h2>
           <p className="hp_mb-5">
             Que tal conversarmos sobre como posso ajudar você na prática?
           </p>
           <a href="https://wa.me/5511999999999" className="hp_btn hp_btn--primary hp_btn--lg">
             Agendar conversa
           </a>
         </div>
       </div>
     </div>
   </div>
 )
}