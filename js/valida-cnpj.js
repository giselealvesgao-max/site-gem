document.addEventListener("DOMContentLoaded", () => {
  const cnpjInput = document.getElementById("cnpj");
  const cnpjErro = document.getElementById("cnpj-erro");
  const form = document.getElementById("form-cotar");
  const btnSubmit = form.querySelector("button[type='submit']");
  
  // ELEMENTOS DO MODAL 
  const botoesCotar = document.querySelectorAll('.open-cotar-modal'); 
  const modalCotar = document.getElementById('modal-cotar'); 
  const inputPlano = document.getElementById('input-plano-selecionado'); 
  const botaoFechar = modalCotar.querySelector('.close-button') || modalCotar.querySelector('span');

  // LÓGICA DE ABERTURA DO MODAL 
  botoesCotar.forEach(botao => { 
    botao.addEventListener('click', (e) => { 
      e.preventDefault(); 
      const nomePlano = botao.getAttribute('data-plano'); 
      if (inputPlano) inputPlano.value = nomePlano; 
      modalCotar.style.display = 'block'; 
    }); 
  }); 

  // LÓGICA DE FECHAMENTO DO MODAL 
  if (botaoFechar) { 
    botaoFechar.addEventListener('click', () => { 
      modalCotar.style.display = 'none'; 
      cnpjErro.style.display = 'none'; 
    }); 
  } 

  // Fecha se clicar fora do conteúdo do modal 
  window.addEventListener('click', (e) => { 
    if (e.target === modalCotar) { 
      modalCotar.style.display = 'none'; 
      cnpjErro.style.display = 'none'; 
    } 
  }); 

  // 1. MÁSCARA DO CNPJ 
  cnpjInput.addEventListener("input", (e) => { 
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 14) value = value.slice(0, 14); 
    
    if (value.length > 12) { 
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"); 
    } else if (value.length > 8) { 
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})$/, "$1.$2.$3/$4"); 
    } else if (value.length > 5) { 
      value = value.replace(/^(\d{2})(\d{3})(\d{0,3})$/, "$1.$2.$3"); 
    } else if (value.length > 2) { 
      value = value.replace(/^(\d{2})(\d{0,3})$/, "$1.$2"); 
    } 
    e.target.value = value; 
  }); 

  // 2. VALIDAÇÃO MATEMÁTICA REAL DO CNPJ 
  cnpjInput.addEventListener("blur", () => { 
    const cnpjLimpo = cnpjInput.value.replace(/\D/g, ""); 
    
    if (cnpjLimpo.length === 0) return; 
    if (cnpjLimpo.length < 14) { 
      exibirErro("CNPJ incompleto."); 
      return; 
    } 

    if (validarCNPJAlgoritmo(cnpjLimpo)) { 
      cnpjErro.style.display = "none"; 
      btnSubmit.disabled = false; 
      console.log("CNPJ validado matematicamente com sucesso!");
    } else { 
      exibirErro("CNPJ inválido ou inexistente."); 
    } 
  }); 

  // 3. INTERCEPTA O ENVIO PARA DISPARAR NO WHATSAPP
  form.addEventListener("submit", (e) => { 
    e.preventDefault(); 

    // Captura os valores finais preenchidos 
    const plano = document.getElementById("input-plano-selecionado").value; 
    const nome = document.getElementById("nome").value; 
    const email = document.getElementById("email").value; 
    const whatsappCliente = document.getElementById("whatsapp").value; 
    const cnpj = document.getElementById("cnpj").value; 
    const messageBox = document.getElementById("mensagem");
    const mensagemLivre = messageBox ? messageBox.value : ""; 

    // Seu WhatsApp corporativo configurado corretamente (apenas números)
    const numeroDestino = "5521965459494";

    // Monta a estrutura de texto da mensagem
    let textoMensagem = `*Solicitação de Cotação - GEM*\n\n`; 
    textoMensagem += `*Plano de Interesse:* ${plano}\n`; 
    textoMensagem += `*Nome:* ${nome}\n`; 
    textoMensagem += `*E-mail:* ${email}\n`; 
    textoMensagem += `*WhatsApp:* ${whatsappCliente}\n`; 
    textoMensagem += `*CNPJ:* ${cnpj}\n`; 
    
    if (mensagemLivre.trim() !== "") { 
      textoMensagem += `*Mensagem Adicional:* ${mensagemLivre}\n`; 
    } 

    const textoCodificado = encodeURIComponent(textoMensagem); 

    // Montagem da URL no padrão oficial exigido pelas APIs
    const linkWhatsapp = "https://whatsapp.com" + numeroDestino + "&text=" + textoCodificado;

    console.log("LINK GERADO PARA O WHATSAPP:", linkWhatsapp);

    // CORREÇÃO DA JORNADA: Abre a aba do WhatsApp primeiro, enquanto as variáveis contêm os dados
    window.open(linkWhatsapp, "_blank"); 

    // Depois que a aba abriu, limpa e fecha o modal na tela do site
    modalCotar.style.display = 'none'; 
    cnpjErro.style.display = 'none'; 
    form.reset(); 
  }); 

  function exibirErro(mensagem) { 
    cnpjErro.textContent = mensagem; 
    cnpjErro.style.color = "#ff6b6b"; 
    cnpjErro.style.display = "block"; 
    btnSubmit.disabled = true; 
  } 

  function validarCNPJAlgoritmo(cnpj) { 
    if (/^(\d)\1+$/.test(cnpj)) return false; 
     
    let tamanho = cnpj.length - 2; 
    let numeros = cnpj.substring(0, tamanho); 
    let digitos = cnpj.substring(tamanho); 
    let soma = 0; 
    let pos = tamanho - 7; 
    for (let i = tamanho; i >= 1; i--) { 
      soma += numeros.charAt(tamanho - i) * pos--; 
      if (pos < 2) pos = 9; 
    } 
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11); 
    if (resultado != digitos.charAt(0)) return false; 
     
    tamanho = tamanho + 1; 
    numeros = cnpj.substring(0, tamanho); 
    soma = 0; 
    pos = tamanho - 7; 
    for (let i = tamanho; i >= 1; i--) { 
      soma += numeros.charAt(tamanho - i) * pos--; 
      if (pos < 2) pos = 9; 
    } 
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11); 
    if (resultado != digitos.charAt(1)) return false; 
     
    return true; 
  } 
});
