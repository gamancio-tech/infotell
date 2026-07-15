/* ============================================================
   NAVBAR.JS — comportamento compartilhado por todas as páginas
   (scroll com blur, menu mobile). Importado dentro de Navbar.astro,
   então nenhuma página precisa reimplementar isso.
   ============================================================ */

const navbar = document.getElementById('navbar');
const servicesNav = document.getElementById('navbar-services');
const navbarNav = document.getElementById('navbar-nav');

if (navbar && servicesNav && navbarNav) {
	// Adiciona classe "scrolled" ao rolar a página
	window.addEventListener(
		'scroll',
		() => {
			navbar.classList.toggle('navbar--scrolled', window.scrollY > 10);
		},
		{ passive: true }
	);

	// Abre/fecha o menu mobile
	servicesNav.addEventListener('click', () => {
		const isOpen = navbarNav.classList.toggle('navbar__nav--open');
		servicesNav.classList.toggle('navbar__services--open', isOpen);
		servicesNav.setAttribute('aria-expanded', String(isOpen));
	});

	// Fecha o menu ao clicar em um link
	navbarNav.querySelectorAll('.navbar__link').forEach((link) => {
		link.addEventListener('click', () => {
			navbarNav.classList.remove('navbar__nav--open');
			servicesNav.classList.remove('navbar__services--open');
			servicesNav.setAttribute('aria-expanded', 'false');
		});
	});
}
