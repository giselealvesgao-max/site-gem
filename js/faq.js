document.querySelectorAll(".faq-toggle").forEach(button => {
  button.addEventListener("click", () => {

    const content = button.previousElementSibling;
    const isOpen = !content.classList.contains("collapsed");

    // 🔥 FECHA TODOS
    document.querySelectorAll(".faq-text").forEach(el => {
      el.classList.add("collapsed");
    });

    document.querySelectorAll(".faq-toggle").forEach(btn => {
      btn.textContent = "Ver mais";
    });

    // 🔥 SE O CLICADO ESTAVA FECHADO, ABRE ELE
    if (!isOpen) {
      content.classList.remove("collapsed");
      button.textContent = "Ver menos";
    }

  });
});