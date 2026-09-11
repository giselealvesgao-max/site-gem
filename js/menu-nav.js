document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".table-scroll-container"); 
  const menuItems = document.querySelectorAll(".pricing-nav-menu .nav-item"); 
  const arrow = document.querySelector(".menu-arrow"); 
  const tbodies = document.querySelectorAll(".comparison-table tbody"); 

  function moveArrow(activeItem) { 
    if (!activeItem || !arrow) return; 
    const itemTop = activeItem.offsetTop; 
    const itemHeight = activeItem.offsetHeight; 
    // Centraliza a ponta da seta verticalmente no meio do botão ativo
    arrow.style.top = (itemTop + (itemHeight / 2) - 10) + "px"; 
  } 

  // 1. CLIQUE NO MENU: Move a categoria de forma nativa e ultra precisa
  menuItems.forEach((item) => { 
    item.addEventListener("click", function (e) { 
      e.preventDefault(); 
      let targetId = this.getAttribute("href");
      
      // Correção e normalização de singular/plural entre links do menu e IDs da tabela
      if (targetId === '#cat-produto') targetId = '#cat-produtos';
      if (targetId === '#cat-relatorio') targetId = '#cat-relatorio';

      const targetSection = document.querySelector(targetId);
      
      if (targetSection && container) {
        // Pausa temporariamente o escutador de scroll manual para evitar trepidação na animação
        container.removeEventListener("scroll", handleScroll);

        menuItems.forEach(i => i.classList.remove("active"));
        this.classList.add("active");
        moveArrow(this);

        // Faz a categoria rolar perfeitamente até o topo visível da tabela
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });

        // Reativa a leitura do scroll do usuário após o término da animação
        setTimeout(() => {
          container.addEventListener("scroll", handleScroll);
        }, 600);
      } 
    }); 
  }); 

  // 2. ROLAGEM DA TABELA (SCROLL): Sincroniza o menu baseado na leitura em tempo real
  function handleScroll() {
    let currentActiveId = "";
    const containerTop = container.getBoundingClientRect().top;
    
    // Define a linha de leitura exata logo abaixo do cabeçalho fixo (45px de tolerância)
    const readingLine = containerTop + 45;

    for (let i = 0; i < tbodies.length; i++) {
      const tbody = tbodies[i];
      const rect = tbody.getBoundingClientRect();

      // Checa se o topo da categoria cruzou a linha superior do grid
      if (rect.top <= readingLine && rect.bottom > readingLine) {
        currentActiveId = tbody.getAttribute("id");
        break; // Encontrou o bloco visível, interrompe a varredura
      }
    }

    if (currentActiveId) {
      // Normalização bidirecional das strings para bater com o menu lateral
      let matchingHref = `#${currentActiveId}`;
      if (currentActiveId === 'cat-produtos') matchingHref = '#cat-produto'; 
      if (currentActiveId === 'cat-notas') matchingHref = '#cat-notas'; 
      if (currentActiveId === 'cat-financeiro') matchingHref = '#cat-financeiro'; 
      if (currentActiveId === 'cat-relatorio') matchingHref = '#cat-relatorio'; 

      menuItems.forEach((item) => { 
        if (item.getAttribute("href") === matchingHref) {
          if (!item.classList.contains("active")) {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            moveArrow(item); 
          }
        } 
      }); 
    } 
  }

  if (container) {
    container.addEventListener("scroll", handleScroll);
  }

  // Posiciona a seta no primeiro item ativo na inicialização do sistema
  const initialActive = document.querySelector(".pricing-nav-menu .nav-item.active");
  if (initialActive) moveArrow(initialActive);
});

