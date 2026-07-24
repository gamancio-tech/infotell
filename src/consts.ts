// src/consts.ts

export const whatsappHref = (msg: string) =>
  `https://wa.me/5516988750149?text=${encodeURIComponent(msg)}`;
export const TELEFONE = "tel:+5516988750149"
export const INSTAGRAM_HREF = "https://www.instagram.com/infotellfranca_/";
export const EMAIL_CONTATO = "infotellsuporte@gmail.com";

export const DEPOIMENTOS = [
	{
		texto: "Técnico muito prestativo na explicação e orientação sobre os equipamentos se colocando a disposição para tirar quaisquer dúvidas e ainda deu de brinde garantia de 6 meses na instalação. Responde whatsapp e ligações rapidamente, o que os diferencia de outras empresas do segmento.",
		autor: "Vanessa",
		bairro: "Franca, SP",
	},
	{
		texto: "Instalação limpa e organizada, sem sujeira nenhuma. Recomendo bastante.",
		autor: "Cliente Infotell",
		bairro: "Franca, SP",
	},
	{
		texto: "Suporte rápido sempre que precisei. Sinto segurança em indicar para amigos.",
		autor: "Cliente Infotell",
		bairro: "Franca, SP",
	},
];