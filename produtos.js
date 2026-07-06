document.addEventListener('DOMContentLoaded', function() {
    const btnVerMais = document.getElementById('verMaisBtn');
    
    if (btnVerMais) {
        btnVerMais.addEventListener('click', function() {
            const produtosExtras = document.querySelectorAll('.produto-oculto');
            
            produtosExtras.forEach(produto => {
               
                produto.classList.remove('produto-oculto');
            });

            this.style.display = 'none';
        });
    }
});

const searchContainer = document.querySelector('.search-container');
const botaoLupa = document.getElementById('botao-lupa');
const campoBusca = document.getElementById('campo-busca');

botaoLupa.addEventListener('click', (evento) => {

    evento.preventDefault(); 
    
    searchContainer.classList.toggle('ativo');
    
    if (searchContainer.classList.contains('ativo')) {
        campoBusca.focus();
    }
});

document.addEventListener('click', (evento) => {
    if (!searchContainer.contains(evento.target)) {
        searchContainer.classList.remove('ativo');
    }
});
