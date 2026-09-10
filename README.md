<h1 align="center">🌐 Infotell — Site Institucional</h1> <p align="center"> <img src="https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" /> </p> <p align="center"> Site institucional da <strong>Infotell</strong> — segurança eletrônica, controle de acesso, automação de portões, serviços elétricos e redes, atendendo condomínios, residências e empresas em Franca/SP. </p>
📖 Sobre o projeto

Este repositório contém o site institucional da Infotell, construído com Astro. O objetivo do site é representar digitalmente a qualidade dos serviços da empresa, priorizando confiança, clareza e geração de novos contatos (leads via WhatsApp).

Toda decisão de produto responde a uma pergunta guia: "Esta decisão aumenta a confiança do cliente na Infotell?" — se a resposta for não, ela é reavaliada. Esse e outros princípios estão documentados em documentacao/FOUNDATION.md.

O projeto migrou de HTML/CSS/JS estático para Astro. Motivo: em HTML puro, navbar/footer/head são copiados em todo arquivo novo — qualquer ajuste no menu exigia editar todos os arquivos. Com Astro, essas peças existem uma única vez como componentes, e o build continua gerando HTML estático puro (sem precisar de servidor Node em produção). A decisão completa está registrada em documentacao/ARCHITECTURE.md.

✨ Funcionalidades e páginas
Página	Rota	Descrição
Home	/	Página inicial institucional
Conheça	/conheca	Experiência narrativa em scroll (GSAP + ScrollTrigger) apresentando a empresa
Serviços → Câmeras	/servicos/cameras	Página dedicada ao serviço de CFTV / câmeras de segurança
Feedback	/feedback	Depoimentos reais de clientes
Manutenção	/manutencao	Página de manutenção/aviso

Áreas de atuação da Infotell representadas no site:

🎥 Segurança Eletrônica — câmeras (CFTV), alarmes monitorados, cercas elétricas
🔐 Controle de Acesso — interfones, fechaduras eletrônicas, portarias e condomínios
🚪 Automação de Portões — motores, configuração, manutenção preventiva
⚡ Serviços Elétricos — instalações, quadros de distribuição, projetos de baixa tensão
🌐 Redes e Tecnologia — redes cabeadas, infraestrutura, soluções corporativas

Público-alvo: condomínios, residências e empresas.

🏗️ Arquitetura

Estrutura organizada por responsabilidade — cada peça existe uma única vez e é reutilizada entre páginas:

infotell/
├── public/
│   ├── favicon/
│   └── images/
│       ├── shared/          # Logo, símbolo — usados em várias páginas
│       ├── index/           # Imagens exclusivas da home
│       ├── conheca/          # Fotos reais da página "conheça"
│       └── wireframes/       # Apenas referência de design
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro     # <head>, favicons, fontes — definidos 1x
│   ├── components/               # Peças reutilizáveis entre páginas
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── FeedbackStep.astro
│   │   └── ImagePlaceholder.astro
│   ├── pages/                    # Cada arquivo = 1 página do site
│   │   ├── index.astro
│   │   ├── conheca.astro
│   │   ├── feedback.astro
│   │   ├── manutencao.astro
│   │   └── servicos/
│   │       └── cameras.astro
│   ├── styles/
│   │   ├── base.css              # Tokens de cor/fonte, reset
│   │   ├── components/           # CSS de navbar, footer, botões
│   │   ├── pages/                # CSS exclusivo de cada página
│   │   ├── animations.css
│   │   └── main.css              # Ponto de entrada único
│   ├── scripts/
│   │   ├── components/navbar.js  # Comportamento da navbar (menu mobile etc.)
│   │   ├── pages/                # JS exclusivo de cada página
│   │   └── utils/scrollReveal.js # Helper genérico de fade-in ao rolar
│   └── consts.ts                 # Contatos, links (WhatsApp, Instagram, e-mail) e depoimentos
└── documentacao/
    ├── FOUNDATION.md              # Objetivos de negócio e princípios do projeto
    └── ARCHITECTURE.md            # Decisões técnicas e convenções
Convenções
Nomenclatura CSS: BEM (bloco__elemento--modificador)
Onde colocar CSS/JS novo:
Usado em 2+ páginas → components/
Usado em só 1 página → pages/<nome-da-pagina>.css / .js
Imagens que ainda não existem: usar <ImagePlaceholder label="..." /> em vez de um <img> quebrado; substituir pela imagem real assim que disponível
🚀 Como rodar o projeto
bash
npm install       # instala as dependências (só na primeira vez)
npm run dev       # inicia o servidor de desenvolvimento (localhost:4321)
npm run build     # gera a versão final de produção em /dist
npm run preview   # serve a versão de produção localmente, pra conferir

O build gera HTML estático — pode ser hospedado em qualquer lugar (Vercel, Netlify, cPanel etc.), sem depender de um servidor Node em produção.

🧭 Roadmap
 Substituir imagens placeholder pelas fotos reais de cada página
 Adicionar novas páginas de serviço em src/pages/servicos/ (hoje só cameras.astro existe)
 Melhorar SEO local
 Loja / e-commerce (planejado): quando implementada, o padrão é uma pasta src/pages/loja/ com uma página por categoria/produto, reaproveitando o mesmo layout, navbar e footer já existentes

Objetivos de negócio de curto, médio e longo prazo estão detalhados em documentacao/FOUNDATION.md.

📚 Documentação adicional
documentacao/FOUNDATION.md — objetivos estratégicos, escopo e princípios do projeto
documentacao/ARCHITECTURE.md — decisões técnicas, estrutura de pastas e convenções
📞 Contato Infotell
💬 WhatsApp: (16) 98875-0149
📷 Instagram: @infotellfranca_
✉️ E-mail: infotellsuporte@gmail.com
👨‍💻 Autor

Desenvolvido por Gustavo Amancio (@gamancio-tech) para a Infotell.
