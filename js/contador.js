const numeros = document.querySelectorAll(".contador");

let animou = false;

function animarNumeros() {
  numeros.forEach((numero) => {
    const alvo = parseInt(numero.getAttribute("data-target"));
    let atual = 0;

    const duracao = 1500;
    const incremento = alvo / (duracao / 16);

    function atualizar() {
      atual += incremento;

      if (atual < alvo) {
        numero.textContent = Math.floor(atual);
        requestAnimationFrame(atualizar);
      } else {
        numero.textContent = alvo;
      }
    }

    atualizar();
  });
}

window.addEventListener("scroll", () => {
  const secao = document.querySelector(".numeros-gem");

  if (!secao) return;

  const posicao = secao.getBoundingClientRect().top;

  if (posicao < window.innerHeight && !animou) {
    animarNumeros();
    animou = true;
  }
});