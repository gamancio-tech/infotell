const skipBtn = document.getElementById("skip-btn-welcome-page");
const menusSkip = document.getElementById("menus-skip");

const sectionServicos = document.getElementById("servicos-welcome");

const sectionServicoCameras = document.getElementById("section-servicos-welcome-cameras");
const sectionServicoEletrica = document.getElementById("section-servicos-welcome-eletrica");
const sectionServicoPortoes = document.getElementById("section-servicos-welcome-portoes");
const sectionServicoControleAcesso = document.getElementById("section-servicos-welcome-controle-acesso");

const imagensServicos = [...sectionServicos.querySelectorAll('img')];
// serve para obter a ordem em que as imagens estavam antes de mudar para dentro das sections
const proximosIrmaos = new Map();
imagensServicos.forEach(img => {
  proximosIrmaos.set(img, img.nextSibling);
});

const sections = [
    sectionServicoCameras,
    sectionServicoEletrica,
    sectionServicoPortoes,
    sectionServicoControleAcesso
]; // só para excluir tudo de uma vez

const mapaServicos = {
  "cameras": sectionServicoCameras,
  "eletrica": sectionServicoEletrica,
  "portoes": sectionServicoPortoes,
  "controle-acesso": sectionServicoControleAcesso
}; // vincula cada imagem a uma section de descrição do serviço

//==================
// Area de serviços
//==================
function deleteGroups(groups) {    
    groups.forEach(group => {
        if (group) group.remove();
    });
};

let imagemAtiva = null; // guarda qual imagem está "expandida" no momento

function mostrarSectionServico(imagem) {
    const section = mapaServicos[imagem.dataset.servico]; // pega "cameras", "eletrica", etc e busca a section certa no mapa

    if (section) {
        section.insertBefore(imagem, section.firstChild); //joga a imagem dentro da section
        imagem.style.margin = '0 2rem 0.1rem 0';
        sectionServicos.appendChild(section);
    };

    // esconde as outras imagens
    const outrasImagensServico = imagensServicos.filter(img => img !== imagem);
    outrasImagensServico.forEach(img => {
        img.style.display = 'none';
    });
    imagemAtiva = imagem;
};

function restaurarServicos() {
    // mostra todas as imagens de novo
    imagensServicos.forEach(img => {
        img.style.display = '';
    });

    // esconde/remove a section que estava aberta
    const section = mapaServicos[imagemAtiva.dataset.servico];
    if (section) {
        sectionServicos.insertBefore(imagemAtiva, proximosIrmaos.get(imagemAtiva));
        section.remove();
    }

    imagemAtiva = null;
}

//================ rodando
// Começa tirando todas as sections (descrição dos serviços)
deleteGroups(sections);

imagensServicos.forEach(imagem => {
  imagem.addEventListener('click', () => {
    if (imagemAtiva === imagem) {
      // clicou na mesma imagem que já estava ativa → reverte
      restaurarServicos(); // volta as imagens e exclui a section
    } else {
        mostrarSectionServico(imagem); // tira as outras imagens e add a section 
    };
  });
});

//================
// Pular
//================
menusSkipLocation = [menusSkip.parentElement,menusSkip.nextSibling]
menusSkip.remove();
let optionMenuAtivo = false;

skipBtn.addEventListener('click', () => {
    if (optionMenuAtivo){
        menusSkip.remove();;
        optionMenuAtivo = false;
        skipBtn.style.borderRadius = "10px";
    }else{
        optionMenuAtivo = true;
        skipBtn.style.borderRadius = "4px";
        menusSkipLocation[0].insertBefore(menusSkip, menusSkipLocation[1])
    };
});


//================
// Continuar vendo
//================

