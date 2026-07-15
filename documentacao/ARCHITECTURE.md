# ARCHITECTURE.md

> **Projeto:** Infotell Master Project
> **Documento:** ARCHITECTURE.md
> **Versão:** 1.0.0
> **Relacionado a:** FOUNDATION.md

## Decisão

O site migrou de HTML/CSS/JS puro para **Astro** (gerador de site estático).

**Por quê:** o projeto vai crescer para muitas páginas e possivelmente uma
loja. Em HTML puro, navbar/footer/head são copiados em todo arquivo novo —
qualquer ajuste no menu exige editar todos os arquivos. Com Astro, esses
pedaços existem uma única vez como componentes, e o build gera HTML estático
normal (continua podendo ser hospedado em qualquer lugar: Vercel, Netlify,
cPanel etc. — não precisa de servidor Node rodando em produção).

## Como rodar o projeto

```bash
npm install       # instala as dependências (só na primeira vez)
npm run dev       # inicia o servidor de desenvolvimento (localhost:4321)
npm run build     # gera a versão final de produção em /dist
npm run preview   # serve a versão de produção localmente, pra conferir
```

## Estrutura de pastas

```
infotell-astro/
├── public/                  Arquivos servidos exatamente como estão
│   ├── favicon/
│   └── images/
│       ├── shared/          Logo, símbolo — usados em várias páginas
│       ├── index/           Imagens exclusivas da home
│       ├── conheca/         Fotos reais da página conheça (adicionar aqui)
│       └── wireframes/      Apenas referência de design, não é conteúdo do site
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro    <head>, favicons, fontes — 1x só
│   ├── components/              Peças reutilizáveis entre páginas
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── ImagePlaceholder.astro
│   ├── pages/                   Cada arquivo aqui = 1 página do site
│   │   ├── index.astro          → infotell.com.br/
│   │   └── conheca.astro        → infotell.com.br/conheca
│   ├── styles/
│   │   ├── base.css             Tokens de cor/fonte, reset
│   │   ├── components/          CSS de navbar, footer, botões
│   │   ├── pages/                CSS exclusivo de cada página
│   │   ├── animations.css
│   │   └── main.css             Ponto de entrada único (importa tudo)
│   └── scripts/
│       ├── components/navbar.js Comportamento da navbar (menu mobile etc.)
│       ├── pages/                JS exclusivo de cada página
│       └── utils/scrollReveal.js Helper genérico de fade-in ao rolar
└── documentacao/
    ├── FOUNDATION.md
    └── ARCHITECTURE.md          este arquivo
```

## Convenções

- **Nomenclatura CSS:** BEM (`bloco__elemento--modificador`), como já era usado.
- **Onde colocar CSS/JS novo:**
  - Vale para 2+ páginas → `components/`
  - Só usado em 1 página → `pages/<nome-da-pagina>.css` / `.js`
- **Imagens que ainda não existem:** use `<ImagePlaceholder label="..." />`
  em vez de um `<img>` quebrado. Quando a foto real chegar, troque pelo
  `<img src="/images/<pagina>/arquivo.jpg" alt="..." />` correspondente.

## Como adicionar uma nova página

1. Criar `src/pages/nome-da-pagina.astro`.
2. Envolver o conteúdo com `<BaseLayout>`, `<Navbar>` e `<Footer>` (ver
   `conheca.astro` como exemplo).
3. Se precisar de CSS/JS específico, criar `src/styles/pages/nome.css` e
   `src/scripts/pages/nome.js`, e importar `main.css`/o script no arquivo
   `.astro` da página.

Pronto — a página já aparece automaticamente em `/nome-da-pagina`, sem
precisar copiar navbar, footer ou `<head>`.

## Crescimento futuro (e-commerce)

Quando a loja for implementada, o padrão recomendado é criar uma pasta
`src/pages/loja/` com uma página por categoria/produto (ou rotas dinâmicas
do Astro, se o catálogo vier de uma API/CMS). O layout, a navbar e o footer
continuam sendo os mesmos componentes já existentes — não é necessário
reestruturar o que já foi feito.

## Histórico

### 1.0.0
Migração de HTML/CSS/JS estático para Astro. Estrutura de pastas
reorganizada por responsabilidade (base / components / pages). Página
`conheca.astro` reconstruída como experiência narrativa em scroll com
GSAP + ScrollTrigger.
