/* ============================================================
   index.js — comportamento exclusivo da página inicial
   (carrossel de serviços). Comportamento comum (navbar, fade-in
   genérico) já vive em scripts/components e scripts/utils.
   ============================================================ */

import { initScrollReveal } from '../utils/scrollReveal.js';

'use strict';

// =====================
// Dados dos Serviços
// =====================
const SERVICOS_DATA = {
	cameras: {
		img: '/images/index/secao-cameras.png',
		alt: 'Câmera de segurança Intelbras instalada',
		tag: 'SOLUÇÃO COMPLETA',
		titulo: 'Câmeras de Segurança',
		descricao:
			'Projetos personalizados, equipamentos de alta qualidade e instalação profissional para garantir monitoramento eficiente 24 horas por dia.',
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
		img: '/images/index/secao-alarmes.png',
		alt: 'Sistema de alarme residencial instalado',
		tag: 'PROTEÇÃO ATIVA',
		titulo: 'Alarmes',
		descricao:
			'Sistemas de alarme de última geração com sensores de alta sensibilidade, sirenes, integração com câmeras para proteção completa.',
		features: [
			'Monitoramento 24h via app',
			'Todos os tipos de sensores',
			'Integração com câmeras e controle de acesso',
		],
	},
	'controle-acesso': {
		img: '/images/index/secao-controle-acesso.png',
		alt: 'Sistema de controle de acesso',
		tag: 'ACESSO INTELIGENTE',
		titulo: 'Controle de Acesso',
		descricao:
			'Soluções modernas de controle de acesso facial, biométrico, cartão RFID e senha, entre outros, para residências, condomínios e empresas, garantindo segurança e praticidade.',
		features: [
			'Fechadura inteligente',
			'Biometria digital e facial',
			'Cartão RFID e senha eletrônica',
			'Gerenciamento remoto de acessos',
		],
	},
	'casa-inteligente': {
		img: '/images/index/secao-casa-inteligente.png',
		alt: '',
		tag: 'SEGURANÇA SMART',
		titulo: 'Casa Inteligente',
		descricao:
			'Soluções inteligentes para todos os tipos de cenários, tranquildade e conforto ao alcance da sua mão.',
		features: [
			'Automatização completa',
			'Alarme e câmeras integrados ao sistema',
			'Integração com diferentes equipamentos',
			'Qualidade e segurança intelbras',
		],
	},
	portoes: {
		img: '/images/index/secao-portoes.png',
		alt: '',
		tag: 'PRATICIDADE E SEGURANÇA',
		titulo: 'Automação de Portões',
		descricao:
			'Conforto e segurança com motores e automatizadores de alta performance para portões basculantes, deslizantes',
		features: [
			'Motores basculante e deslizante e pivotante',
			'Controle remoto e via app',
			'Instalação rápida e de qualidade',
			'Manutenção preventiva e corretiva',
		],
	},
	eletrica: {
		img: '/images/index/secao-eletrica.png',
		alt: '',
		tag: 'PROJETOS ELÉTRICOS',
		titulo: 'Instalações Elétricas',
		descricao:
			'Projetos elétricos residenciais e comerciais com qualidade, segurança e conformidade com as normas técnicas, da adequação à manutenção corretiva.',
		features: ['Projetos residenciais e comerciais', 'Adequação às normas ABNT', 'Quadros de comandos'],
	},
};

const SERVICOS_ORDER = ['cameras', 'alarmes', 'controle-acesso', 'casa-inteligente', 'portoes', 'eletrica'];

let servicoAtivo = 'cameras';

// =====================
// Carousel de Serviços
// =====================
const painelImagem = document.getElementById('painel-imagem');
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
	if (!dados || !painelConteudo) return;
	
	//mudar imagens centrais
	painelImagem.src = dados.img; 
	painelImagem.alt = dados.alt; 

	const featuresHTML = dados.features
		.map((f) => `<li class="painel__feature"><i class="fa-solid fa-check" aria-hidden="true"></i>${f}</li>`)
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
	void painelConteudo.offsetHeight; // força reflow
	painelConteudo.style.animation = '';

	painelPanel?.setAttribute('aria-labelledby', `tab-${chave}`);
}

/**
 * Ativa um serviço: destaca o botão da lista e renderiza o painel.
 * @param {string} chave — chave do serviço
 */
function ativarServico(chave) {
	if (chave === servicoAtivo) return;

	const tabAnterior = document.getElementById(`tab-${servicoAtivo}`);
	if (tabAnterior) {
		tabAnterior.classList.remove('servico-item--ativo');
		tabAnterior.setAttribute('aria-selected', 'false');
	}

	const tabNova = document.getElementById(`tab-${chave}`);
	if (tabNova) {
		tabNova.classList.add('servico-item--ativo');
		tabNova.setAttribute('aria-selected', 'true');
	}

	servicoAtivo = chave;
	renderizarPainel(chave);
}

tabBtns.forEach((btn) => {
	btn.addEventListener('click', () => ativarServico(btn.dataset.servico));
});

prevBtn?.addEventListener('click', () => {
	const idx = SERVICOS_ORDER.indexOf(servicoAtivo);
	const prevIdx = (idx - 1 + SERVICOS_ORDER.length) % SERVICOS_ORDER.length;
	ativarServico(SERVICOS_ORDER[prevIdx]);
});

nextBtn?.addEventListener('click', () => {
	const idx = SERVICOS_ORDER.indexOf(servicoAtivo);
	const nextIdx = (idx + 1) % SERVICOS_ORDER.length;
	ativarServico(SERVICOS_ORDER[nextIdx]);
});

// Render inicial
renderizarPainel(servicoAtivo);

// =====================
// Animações de entrada
// =====================
initScrollReveal('.sobre__container, .servicos__container, .cta-banner__container, .diferenciais__container');
initScrollReveal('.diferencial', { staggerChildren: true });
