/* ============================================================
   INDEX.JS — Infotell Landing Page
   Página: index.html
   ============================================================ */

'use strict';

// =====================
// Dados dos Serviços
// =====================
const SERVICOS_DATA = {
    cameras: {
        tag: 'SOLUÇÃO COMPLETA',
        titulo: 'Câmeras de Segurança',
        descricao: 'Projetos personalizados, equipamentos de alta qualidade e instalação profissional para garantir monitoramento eficiente 24 horas por dia.',
        features: [
            'Câmeras IP e Full HD',
            'Gravação em nuvem',
            'Acesso remoto via app',
            'Para todos os ambientes',
            'Melhor custo beneficio',
            'Instalação profissional e suporte técnico',
        ],
    },
    alarmes: {
        tag: 'PROTEÇÃO ATIVA',
        titulo: 'Alarmes',
        descricao: 'Sistemas de alarme de última geração com sensores de alta sensibilidade, sirenes, integração com câmeras para proteção completa.',
        features: [
            'Monitoramento 24h via app',
            'Todos os tipos de sensores',
            'Integração com câmeras e controle de acesso',
        ],
    },
    'controle-acesso': {
        tag: 'ACESSO INTELIGENTE',
        titulo: 'Controle de Acesso',
        descricao: 'Soluções modernas de controle de acesso facial, biométrico, cartão RFID e senha, entre outros, para residências, condomínios e empresas, garantindo segurança e praticidade.',
        features: [
            'Fechadura inteligente',
            'Biometria digital e facial',
            'Cartão RFID e senha eletrônica',
            'Controle de entradas e saídas',
            'Gerenciamento remoto de acessos',
        ],
    },
    'casa-inteligente': {
        tag: 'SEGURANÇA SMART',
        titulo: 'Casa Inteligente',
        descricao: 'Soluções inteligentes para todos os tipos de cenários, tranquildade e conforto ao alcance da sua mão.',
        features: [
            'Para todos os tipos de ambientes',//parei aqui
            'Alarme integrado ao painel',
            'Proteção perimetral eficiente',
            'Manutenção preventiva inclusa',
        ],
    },
    portoes: {
        tag: 'PRATICIDADE E SEGURANÇA',
        titulo: 'Automação de Portões',
        descricao: 'Conforto e segurança com motores e automatizadores de alta performance para portões basculantes, deslizantes e de garagem.',
        features: [
            'Motores basculante e deslizante',
            'Controle remoto e via app',
            'Instalação rápida e garantia',
            'Compatível com interfone e câmeras',
        ],
    },
    eletrica: {
        tag: 'PROJETOS ELÉTRICOS',
        titulo: 'Instalações Elétricas',
        descricao: 'Projetos elétricos residenciais e comerciais com qualidade, segurança e conformidade com as normas técnicas, da adequação à manutenção corretiva.',
        features: [
            'Projetos residenciais e comerciais',
            'Adequação às normas ABNT',
            'Quadros de distribuição e SPDA',
            'Manutenção preventiva e corretiva',
        ],
    },
};

const SERVICOS_ORDER = ['cameras', 'alarmes', 'controle-acesso', 'casa-inteligente', 'portoes', 'eletrica'];

let servicoAtivo = 'cameras';

// =====================
// Navbar
// =====================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('navbar-services');
const navbarNav = document.getElementById('navbar-nav');

// Adiciona classe scrolled ao fazer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('navbar--scrolled');
    } else {
        navbar.classList.remove('navbar--scrolled');
    }
}, { passive: true });

// Menu mobile
hamburger.addEventListener('click', () => {
    const isOpen = navbarNav.classList.toggle('navbar__nav--open');
    hamburger.classList.toggle('navbar__services--open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Fechar menu ao clicar em um link
navbarNav.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
        navbarNav.classList.remove('navbar__nav--open');
        hamburger.classList.remove('navbar__services--open');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// =====================
// Carousel de Serviços
// =====================
const painelConteudo = document.getElementById('painel-conteudo');
const painelPanel = document.getElementById('painel-servico');
const tabBtns = document.querySelectorAll('.servico-item[data-servico]');
const prevBtn = document.getElementById('painel-prev-btn');
const nextBtn = document.getElementById('painel-next-btn');

/**
 * Renderiza o painel de detalhe do serviço indicado.
 * @param {string} chave — chave do objeto SERVICOS_DATA
 */
function renderizarPainel(chave) {
    const dados = SERVICOS_DATA[chave];
    if (!dados) return;

    const featuresHTML = dados.features
        .map(f => `<li class="painel__feature"><i class="fa-solid fa-check" aria-hidden="true"></i>${f}</li>`)
        .join('');

    painelConteudo.innerHTML = `
        <p class="painel__tag">${dados.tag}</p>
        <h3 class="painel__titulo">${dados.titulo}</h3>
        <p class="painel__descricao">${dados.descricao}</p>
        <ul class="painel__features" aria-label="Características do serviço">
            ${featuresHTML}
        </ul>
        <div class="painel__cta">
            <a href="https://wa.me/5516988750149?text=Olá,%20tenho%20interesse%20em%20${encodeURIComponent(dados.titulo)}!"
               class="btn btn--laranja"
               target="_blank"
               rel="noopener noreferrer"
               id="painel-cta-btn">
                <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
                QUERO ESSA SOLUÇÃO
            </a>
        </div>
    `;

    // Reinicia animação de entrada
    painelConteudo.style.animation = 'none';
    // Força reflow
    void painelConteudo.offsetHeight;
    painelConteudo.style.animation = '';

    // Atualiza aria-labelledby do tabpanel
    painelPanel.setAttribute('aria-labelledby', `tab-${chave}`);
}

/**
 * Ativa um serviço: destaca o botão da lista e renderiza o painel.
 * @param {string} chave — chave do serviço
 */
function ativarServico(chave) {
    if (chave === servicoAtivo) return;

    // Remove ativo do botão anterior
    const tabAnterior = document.getElementById(`tab-${servicoAtivo}`);
    if (tabAnterior) {
        tabAnterior.classList.remove('servico-item--ativo');
        tabAnterior.setAttribute('aria-selected', 'false');
    }

    // Ativa o novo
    const tabNova = document.getElementById(`tab-${chave}`);
    if (tabNova) {
        tabNova.classList.add('servico-item--ativo');
        tabNova.setAttribute('aria-selected', 'true');
    }

    servicoAtivo = chave;
    renderizarPainel(chave);
}

// Clicks nos tabs da lista
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => ativarServico(btn.dataset.servico));
});

// Navegação com prev/next
prevBtn.addEventListener('click', () => {
    const idx = SERVICOS_ORDER.indexOf(servicoAtivo);
    const prevIdx = (idx - 1 + SERVICOS_ORDER.length) % SERVICOS_ORDER.length;
    ativarServico(SERVICOS_ORDER[prevIdx]);
});

nextBtn.addEventListener('click', () => {
    const idx = SERVICOS_ORDER.indexOf(servicoAtivo);
    const nextIdx = (idx + 1) % SERVICOS_ORDER.length;
    ativarServico(SERVICOS_ORDER[nextIdx]);
});

// Render inicial
renderizarPainel(servicoAtivo);

// =====================
// Animações de entrada (IntersectionObserver)
// =====================
const fadeElements = document.querySelectorAll(
    '.sobre__container, .servicos__container, .cta-banner__container, .diferenciais__container, .diferencial'
);

// Adiciona a classe base em todos os elementos
fadeElements.forEach(el => {
    el.classList.add('fade-in-up');
});

// Adiciona delays escalonados nos diferenciais
document.querySelectorAll('.diferencial').forEach((el, i) => {
    el.classList.add(`fade-in-up-delay-${i + 1}`);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
});

fadeElements.forEach(el => observer.observe(el));
