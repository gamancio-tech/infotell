/* ============================================================
   index.js — comportamento exclusivo da página inicial
   (carrossel de serviços + accordion mobile + depoimentos).
   Comportamento comum (navbar, fade-in genérico) já vive em
   scripts/components e scripts/utils.
   ============================================================ */

import { initScrollReveal } from '../utils/scrollReveal.js';

'use strict';

// =====================
// Dados dos Serviços
// =====================
const SERVICOS_DATA = {
	cameras: {
		img: '/images/index/secao-cameras.png',
		imgMenor: '/images/index/secao-cameras-menor.png',
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
		imgMenor: '/images/index/secao-alarmes-menor.png',
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
		imgMenor: '/images/index/secao-controle-acesso-menor.png',
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
		imgMenor: '/images/index/secao-casa-inteligente-menor.png',
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
		imgMenor: '/images/index/secao-portoes-menor.png',
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
		imgMenor: '/images/index/secao-eletrica-menor.png',
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
// Detecção de Mobile
// =====================
const mobileQuery = window.matchMedia('(max-width: 768px)');

function isMobile() {
	return mobileQuery.matches;
}

// =====================
// Conteúdo do Painel (HTML compartilhado)
// =====================
function gerarFeaturesHTML(features) {
	return features
		.map((f) => `<li class="painel__feature"><i class="fa-solid fa-check" aria-hidden="true"></i>${f}</li>`)
		.join('');
}

function gerarCtaHTML(titulo) {
	return `
		<div class="painel__cta">
			<a href="https://wa.me/5516988750149?text=Olá,%20tenho%20interesse%20em%20${encodeURIComponent(titulo)}!"
			   class="btn btn--laranja"
			   target="_blank"
			   rel="noopener noreferrer"
			   id="painel-cta-btn">
				<i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
				QUERO ESSA SOLUÇÃO
			</a>
		</div>
	`;
}

// =====================
// Modo Desktop — Carousel de Serviços
// =====================
const painelImagem = document.getElementById('painel-imagem');
const painelConteudo = document.getElementById('painel-conteudo');
const painelPanel = document.getElementById('painel-servico');
const tabBtns = document.querySelectorAll('.servico-item[data-servico]');
const prevBtn = document.getElementById('painel-prev-btn');
const nextBtn = document.getElementById('painel-next-btn');

/**
 * Renderiza o painel de detalhe do serviço no desktop.
 * @param {string} chave — chave do objeto SERVICOS_DATA
 */
function renderizarPainelDesktop(chave) {
	const dados = SERVICOS_DATA[chave];
	if (!dados || !painelConteudo) return;

	// Mudar imagem central
	if (painelImagem) {
		painelImagem.src = dados.img;
		painelImagem.alt = dados.alt;
	}

	painelConteudo.innerHTML = `
        <p class="painel__tag">${dados.tag}</p>
        <h3 class="painel__titulo">${dados.titulo}</h3>
        <p class="painel__descricao">${dados.descricao}</p>
        <ul class="painel__features" aria-label="Características do serviço">
            ${gerarFeaturesHTML(dados.features)}
        </ul>
        ${gerarCtaHTML(dados.titulo)}
    `;

	// Reinicia animação de entrada
	painelConteudo.style.animation = 'none';
	void painelConteudo.offsetHeight;
	painelConteudo.style.animation = '';

	painelPanel?.setAttribute('aria-labelledby', `tab-${chave}`);
}

/**
 * Ativa um serviço no desktop: destaca o botão e renderiza o painel.
 * @param {string} chave — chave do serviço
 */
function ativarServicoDesktop(chave) {
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
	renderizarPainelDesktop(chave);
}

// =====================
// Modo Mobile — Accordion de Serviços
// =====================

/**
 * Renderiza e abre/fecha o painel inline de um serviço no mobile.
 * @param {string} chave — chave do serviço
 * @param {HTMLElement} btn — botão que foi clicado
 */
function toggleAccordionMobile(chave, btn) {
	const painelInline = document.getElementById(`painel-inline-${chave}`);
	if (!painelInline) return;

	const dados = SERVICOS_DATA[chave];
	if (!dados) return;

	const jaAberto = painelInline.classList.contains('servico-item__painel-inline--aberto');

	// Fechar todos os painéis abertos
	document.querySelectorAll('.servico-item__painel-inline--aberto').forEach((p) => {
		p.classList.remove('servico-item__painel-inline--aberto');
	});

	// Remover estado ativo de todos os botões
	document.querySelectorAll('.servico-item--ativo').forEach((b) => {
		b.classList.remove('servico-item--ativo');
		b.setAttribute('aria-selected', 'false');
	});

	// Se estava fechado, abrir o clicado
	if (!jaAberto) {
		btn.classList.add('servico-item--ativo');
		btn.setAttribute('aria-selected', 'true');
		servicoAtivo = chave;

		// Renderizar conteúdo do painel inline
		painelInline.innerHTML = `
			<img
				class="painel-inline__img"
				src="${dados.imgMenor}"
				alt="${dados.alt}"
				loading="lazy"
			/>
			<div class="painel-inline__conteudo">
				<p class="painel__tag">${dados.tag}</p>
				<h3 class="painel__titulo">${dados.titulo}</h3>
				<p class="painel__descricao">${dados.descricao}</p>
				<ul class="painel__features" aria-label="Características do serviço">
					${gerarFeaturesHTML(dados.features)}
				</ul>
				${gerarCtaHTML(dados.titulo)}
			</div>
		`;

		painelInline.classList.add('servico-item__painel-inline--aberto');
		painelInline.setAttribute('aria-hidden', 'false');
	} else {
		painelInline.setAttribute('aria-hidden', 'true');
		servicoAtivo = '';
	}
}

// =====================
// Inicializar eventos dos botões de serviço
// =====================
tabBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		const chave = btn.dataset.servico;
		if (isMobile()) {
			toggleAccordionMobile(chave, btn);
		} else {
			ativarServicoDesktop(chave);
		}
	});
});

prevBtn?.addEventListener('click', () => {
	if (isMobile()) return;
	const idx = SERVICOS_ORDER.indexOf(servicoAtivo);
	const prevIdx = (idx - 1 + SERVICOS_ORDER.length) % SERVICOS_ORDER.length;
	ativarServicoDesktop(SERVICOS_ORDER[prevIdx]);
});

nextBtn?.addEventListener('click', () => {
	if (isMobile()) return;
	const idx = SERVICOS_ORDER.indexOf(servicoAtivo);
	const nextIdx = (idx + 1) % SERVICOS_ORDER.length;
	ativarServicoDesktop(SERVICOS_ORDER[nextIdx]);
});

// Ao mudar o tamanho da tela, fechar acordeões abertos e resetar estado
mobileQuery.addEventListener('change', () => {
	// Fechar todos os accordeões mobile
	document.querySelectorAll('.servico-item__painel-inline--aberto').forEach((p) => {
		p.classList.remove('servico-item__painel-inline--aberto');
	});

	// Resetar para o primeiro serviço no desktop
	servicoAtivo = 'cameras';

	if (!isMobile()) {
		// Reativar o primeiro serviço no desktop
		document.querySelectorAll('.servico-item--ativo').forEach((b) => {
			b.classList.remove('servico-item--ativo');
			b.setAttribute('aria-selected', 'false');
		});
		const primeiroBotao = document.getElementById('tab-cameras');
		if (primeiroBotao) {
			primeiroBotao.classList.add('servico-item--ativo');
			primeiroBotao.setAttribute('aria-selected', 'true');
		}
		renderizarPainelDesktop('cameras');
	}
});

// Render inicial (apenas no desktop — no mobile o accordion começa fechado)
if (!isMobile()) {
	renderizarPainelDesktop(servicoAtivo);
}

// =====================
// Carrossel de Depoimentos
// =====================
const cards = document.querySelectorAll('.depoimento-card');
const dots = document.querySelectorAll('.depoimentos-index__dot');
let depoimentoAtivo = 0;

/**
 * Exibe o depoimento de índice fornecido.
 * @param {number} idx
 */
function mostrarDepoimento(idx) {
	cards.forEach((card, i) => {
		card.classList.toggle('depoimento-card--ativo', i === idx);
	});
	dots.forEach((dot, i) => {
		dot.classList.toggle('depoimentos-index__dot--ativo', i === idx);
		dot.setAttribute('aria-selected', i === idx ? 'true' : 'false');
	});
	depoimentoAtivo = idx;
}

const depPrevBtn = document.getElementById('dep-prev-btn');
const depNextBtn = document.getElementById('dep-next-btn');

dots.forEach((dot) => {
	dot.addEventListener('click', () => {
		mostrarDepoimento(Number(dot.dataset.dot));
	});
});

depPrevBtn?.addEventListener('click', () => {
	const prevIdx = (depoimentoAtivo - 1 + cards.length) % cards.length;
	mostrarDepoimento(prevIdx);
});

depNextBtn?.addEventListener('click', () => {
	const nextIdx = (depoimentoAtivo + 1) % cards.length;
	mostrarDepoimento(nextIdx);
});

// Auto-avançar o carrossel a cada 5 segundos
if (cards.length > 1) {
	setInterval(() => {
		const proximo = (depoimentoAtivo + 1) % cards.length;
		mostrarDepoimento(proximo);
	}, 5000);
}

// =====================
// Animações de entrada
// =====================
initScrollReveal('.sobre__container, .servicos__container, .cta-banner__container, .diferenciais__container, .marcas__container, .depoimentos-index__container');
initScrollReveal('.diferencial', { staggerChildren: true });
initScrollReveal('.marca', { staggerChildren: true });
