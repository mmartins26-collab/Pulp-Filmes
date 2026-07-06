document.addEventListener('DOMContentLoaded', () => {
    const verMaisBtn = document.getElementById('verMaisBtn');
    const produtosOcultos = document.querySelectorAll('.produto-oculto');

    if (verMaisBtn) {
        verMaisBtn.addEventListener('click', () => {
            produtosOcultos.forEach(produto => {
                produto.classList.remove('produto-oculto');
            });
            verMaisBtn.style.display = 'none';
        });
    }

    let carrinho = JSON.parse(localStorage.getItem('pulpfilm_cart')) || [];

    const forms = document.querySelectorAll('form[action="/carrinho/adicionar"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const card = form.closest('.review-card');
            const id = form.querySelector('input[name="id"]').value;
            const nome = form.querySelector('input[name="nome"]').value;
            const preco = parseFloat(form.querySelector('input[name="preco"]').value);
            const imagem = card.querySelector('.review-image img').getAttribute('src');

            adicionarAoCarrinho(id, nome, preco, imagem);
        });
    });

    function adicionarAoCarrinho(id, nome, preco, imagem) {
        carrinho = JSON.parse(localStorage.getItem('pulpfilm_cart')) || [];
        
        const itemExistente = carrinho.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantity += 1;
        } else {
            carrinho.push({ id, nome, preco, imagem, quantity: 1 });
        }
        localStorage.setItem('pulpfilm_cart', JSON.stringify(carrinho));
        

        window.location.href = 'carrinho.html';
    }
  
    const cartTableBody = document.getElementById('cartTableBody');
    const cartTotalElement = document.getElementById('cartTotalFinal');

   
    if (cartTableBody) {
        renderizarCarrinhoPage();


        cartTableBody.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (!id) return;

            const item = carrinho.find(item => item.id === id);

            if (e.target.classList.contains('qty-plus')) {
                item.quantity += 1;
            } else if (e.target.classList.contains('qty-minus')) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    carrinho = carrinho.filter(i => i.id !== id);
                }
            } else if (e.target.classList.contains('remove-item-btn')) {
                carrinho = carrinho.filter(i => i.id !== id);
            }

            localStorage.setItem('pulpfilm_cart', JSON.stringify(carrinho));
            renderizarCarrinhoPage();
        });
    }

    function renderizarCarrinhoPage() {
        cartTableBody.innerHTML = '';
        let total = 0;

        if (carrinho.length === 0) {
            cartTableBody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 3rem; color: #b3b3b3;">Seu carrinho está vazio.</td></tr>`;
            if (cartTotalElement) cartTotalElement.textContent = 'R$ 0,00';
            return;
        }

        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantity;
            total += subtotal;

            cartTableBody.innerHTML += `
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 1.5rem 0; display: flex; align-items: center; gap: 1rem;">
                        <img src="${item.imagem}" alt="${item.nome}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #333;">
                        <div>
                            <h3 style="font-size: 1.1rem; color: #e5e5e5; font-weight: 600; margin: 0;">${item.nome}</h3>
                            <button class="remove-item-btn" data-id="${item.id}" style="background: none; border: none; color: #ef5f5f; cursor: pointer; font-size: 0.85rem; padding: 0; margin-top: 0.5rem; display: block;">Remover</button>
                        </div>
                    </td>
                    <td style="padding: 1.5rem 0; color: #d4c117; font-weight: bold;">
                        R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td style="padding: 1.5rem 0;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button class="qty-btn qty-minus" data-id="${item.id}" style="background: #252525; border: none; color: #e5e5e5; width: 28px; height: 28px; border-radius: 4px; cursor: pointer; font-weight: bold;">-</button>
                            <span style="min-width: 20px; text-align: center;">${item.quantity}</span>
                            <button class="qty-btn qty-plus" data-id="${item.id}" style="background: #252525; border: none; color: #e5e5e5; width: 28px; height: 28px; border-radius: 4px; cursor: pointer; font-weight: bold;">+</button>
                        </div>
                    </td>
                    <td style="padding: 1.5rem 0; color: #d4c117; font-weight: bold; text-align: right;">
                        R$ ${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                </tr>
            `;
        });

        if (cartTotalElement) {
            cartTotalElement.textContent = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        }
    }
});
