


/* ==========================================================================
   CONTROLE DO ACCORDION INTELEGENTE (FECHA OS OUTROS AO ABRIR UM NOVO)
   ========================================================================== */
const accordions = document.querySelectorAll('.accordion-details');

accordions.forEach((accordion) => {
    // Escuta o evento 'toggle', que o próprio HTML dispara ao abrir ou fechar
    accordion.addEventListener('toggle', () => {
        // Se este accordion acabou de ser aberto
        if (accordion.open) {
            // Varre os outros e fecha quem estiver aberto (exceto ele mesmo)
            accordions.forEach((outroAccordion) => {
                if (outroAccordion !== accordion) {
                    outroAccordion.open = false;
                }
            });
        }
    });
});
