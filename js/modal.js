
// Script Modal

        document.addEventListener('DOMContentLoaded', () => {
            // Seleciona todos os links dos módulos (usando a classe modulos-item)
            const moduleLinks = document.querySelectorAll('.modulos-item'); 
            // Seleciona todos os botões de fechar
            const closeButtons = document.querySelectorAll('.close-button');

            // Adiciona evento de clique a cada módulo
            moduleLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault(); // Previne que a página role para o topo

                    // Pega o ID do modal alvo (ex: 'modal-produtos') do atributo data-target
                    const targetModalId = link.getAttribute('data-target');
                    const targetModal = document.getElementById(targetModalId);

                    if (targetModal) {
                        targetModal.style.display = 'block'; // Mostra o modal
                    }
                });
            });

            // Adiciona evento de clique para fechar o modal
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const modal = button.closest('.modal');
                    if (modal) {
                        modal.style.display = 'none'; // Esconde o modal
                    }
                });
            });

            // Fecha o modal se o usuário clicar fora do conteúdo
            window.onclick = function(event) {
                if (event.target.classList.contains('modal')) {
                    event.target.style.display = 'none';
                }
            }
        });


