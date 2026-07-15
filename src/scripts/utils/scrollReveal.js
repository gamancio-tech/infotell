/* ============================================================
   scrollReveal.js — helper reutilizável de "fade-in ao rolar"
   Usa IntersectionObserver + a classe .fade-in-up (definida em
   src/styles/animations.css). Qualquer página pode chamar isso
   em vez de reescrever o observer toda vez.
   ============================================================ */

/**
 * Aplica a animação de entrada (fade-in-up) aos elementos indicados
 * conforme eles entram na viewport.
 * @param {string} selector — seletor CSS dos elementos a animar
 * @param {object} [options]
 * @param {number} [options.threshold=0.12]
 * @param {string} [options.rootMargin='0px 0px -40px 0px']
 * @param {boolean} [options.staggerChildren] — se true, aplica delay
 *   escalonado (.fade-in-up-delay-N) a cada elemento encontrado
 */
export function initScrollReveal(selector, options = {}) {
	const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', staggerChildren = false } = options;

	const elements = document.querySelectorAll(selector);
	if (!elements.length) return;

	elements.forEach((el, i) => {
		el.classList.add('fade-in-up');
		if (staggerChildren) {
			el.classList.add(`fade-in-up-delay-${Math.min(i + 1, 5)}`);
		}
	});

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold, rootMargin }
	);

	elements.forEach((el) => observer.observe(el));
}
