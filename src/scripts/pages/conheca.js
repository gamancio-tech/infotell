/* ============================================================
   conheca.js — comportamento exclusivo da página "Conheça"
   Storytelling em scroll: cenas cinematográficas com GSAP +
   ScrollTrigger (reveals, parallax, timeline pinada, contadores).
   Seções mais "informativas" (cards, checklist, depoimentos)
   usam o helper genérico initScrollReveal (mesmo de outras páginas).
   ============================================================ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScrollReveal } from '../utils/scrollReveal.js';

gsap.registerPlugin(ScrollTrigger);

/* -----------------------------------------------------------
   1) Cenas cinematográficas: texto sobe e aparece ao entrar
      na viewport (cada cena tem seu próprio trigger).
----------------------------------------------------------- */
function initCenaReveals() {
	document.querySelectorAll('.cena__texto').forEach((texto) => {
		gsap.to(texto, {
			opacity: 1,
			y: 0,
			duration: 0.9,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: texto,
				start: 'top 75%',
				toggleActions: 'play none none reverse',
			},
		});
	});

	const introTag = document.querySelector('.cena--intro .cena__tag');
	if (introTag) {
		gsap.to(introTag, { opacity: 1, duration: 1, delay: 0.3 });
	}
}

/* -----------------------------------------------------------
   2) Parallax sutil na cena de instalação (cena 4), para dar
      sensação de profundidade enquanto o usuário rola.
----------------------------------------------------------- */
function initParallax() {
	document.querySelectorAll('[data-parallax]').forEach((el) => {
		gsap.to(el, {
			yPercent: 15,
			ease: 'none',
			scrollTrigger: {
				trigger: el.closest('.cena'),
				start: 'top bottom',
				end: 'bottom top',
				scrub: true,
			},
		});
	});
}

/* -----------------------------------------------------------
   3) Timeline sincronizada ao scroll: a seção fica "pinada"
      enquanto o usuário rola, o card de ano atual troca, o
      ponto ativo fica laranja e a linha preenche gradualmente.
----------------------------------------------------------- */
function initTimeline() {
	const section = document.querySelector('.timeline');
	if (!section) return;

	const steps = JSON.parse(section.dataset.steps || '[]');
	const fill = section.querySelector('.timeline__fill');
	const dots = section.querySelectorAll('.timeline__dot');
	const anoEl = section.querySelector('.timeline__ano');
	const tituloEl = section.querySelector('.timeline__titulo');
	const descEl = section.querySelector('.timeline__descricao');

	if (!steps.length || !fill || !dots.length) return;

	let activeIndex = -1;

	function renderStep(index) {
		if (index === activeIndex) return;
		activeIndex = index;
		const step = steps[index];

		dots.forEach((dot, i) => dot.classList.toggle('timeline__dot--active', i <= index));

		gsap.to([anoEl, tituloEl, descEl], {
			opacity: 0,
			duration: 0.15,
			onComplete: () => {
				anoEl.textContent = step.ano;
				tituloEl.textContent = step.titulo;
				descEl.textContent = step.descricao;
				gsap.to([anoEl, tituloEl, descEl], { opacity: 1, duration: 0.25 });
			},
		});
	}

	ScrollTrigger.create({
		trigger: section,
		start: 'top top',
		end: () => `+=${steps.length * 400}`,
		pin: true,
		scrub: true,
		onUpdate: (self) => {
			const progress = self.progress; // 0 -> 1
			fill.style.width = `${progress * 100}%`;

			const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
			renderStep(index);
		},
		onEnter: () => renderStep(0),
	});
}

/* -----------------------------------------------------------
   4) Contadores animados na seção de números (10+, 10.000+, 500+)
----------------------------------------------------------- */
function initCounters() {
	document.querySelectorAll('.numeros__valor').forEach((el) => {
		const targetText = el.dataset.value || el.textContent.trim();
		const numericTarget = parseInt(targetText.replace(/\D/g, ''), 10);
		const suffix = targetText.replace(/[\d.]/g, ''); // ex: "+"

		if (Number.isNaN(numericTarget)) return;

		const counter = { value: 0 };

		ScrollTrigger.create({
			trigger: el,
			start: 'top 85%',
			once: true,
			onEnter: () => {
				gsap.to(counter, {
					value: numericTarget,
					duration: 1.6,
					ease: 'power1.out',
					onUpdate: () => {
						el.textContent = `${Math.floor(counter.value).toLocaleString('pt-BR')}${suffix}`;
					},
				});
			},
		});
	});
}

/* -----------------------------------------------------------
   Inicialização
----------------------------------------------------------- */
initCenaReveals();
initParallax();
initTimeline();
initCounters();

// Seções "informativas" reaproveitam o helper genérico de fade-in
initScrollReveal('.compromisso__card', { staggerChildren: true });
initScrollReveal('.processo__step', { staggerChildren: true });
initScrollReveal('.diferenciais-lista__item', { staggerChildren: true });
initScrollReveal('.galeria__item', { staggerChildren: true });
initScrollReveal('.valores__card', { staggerChildren: true });
initScrollReveal('.depoimento__card', { staggerChildren: true });
initScrollReveal('.cta-final__titulo, .cta-final__subtitulo, .cta-final__actions');
