const apiUrl = 'http://localhost:4000/produto';

function getProdutos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(produtos => {
            const produtosList = document.getElementById('produtosList');
            produtosList.innerHTML = '<h3>Lista de Produtos</h3>';

            produtos.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.innerHTML = `
                    <p><strong>Nome:</strong> ${produto.nome}</p>
                    <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
                    <p><strong>Valor:</strong> ${produto.valor}</p>
                    <p><strong>Armazém:</strong> ${produto.armazem_id ? produto.armazem_id.nome : 'Sem Armazém'}</p>
                    <button onclick="editProduto('${produto._id}')">Editar</button>
                    <button onclick="deleteProduto('${produto._id}')">Excluir</button>
                    <hr>
                `;
                produtosList.appendChild(produtoDiv);
            });
        })
        .catch(error => console.error('Erro ao obter produtos:', error));
}

function postProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const valor = document.getElementById('valor').value;
    const armazemId = document.getElementById('armazemId').value;  // Obter o valor do ID do armazém

    const newProduto = {
        nome,
        quantidade,
        valor,
        armazem_id: armazemId,  // Usar o valor do ID do armazém
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduto),
    })
        .then(response => response.json())
        .then(data => {
            alert('Novo Produto criado com sucesso!');
            getProdutos();
        })
        .catch(error => console.error('Erro ao criar produto:', error));
}

function editProduto(produtoId) {
    const newNome = prompt('Digite o novo nome para o produto:');
    const newQuantidade = prompt('Digite a nova quantidade para o produto:');
    const newValor = prompt('Digite o valor atualizado do produto:');

    if (newNome !== null && newQuantidade !== null && newValor !== null) {
        const updatedProduto = {
            nome: newNome,
            quantidade: newQuantidade,
            valor: newValor,
        };

        fetch(`${apiUrl}/${produtoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduto),
        })
            .then(response => response.json())
            .then(data => {
                alert('Produto atualizado com sucesso!');
                getProdutos();
            })
            .catch(error => console.error('Erro ao atualizar produto:', error));
    }
}

function deleteProduto(produtoId) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este produto?');

    if (confirmDelete) {
        fetch(`${apiUrl}/${produtoId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert('Produto excluído com sucesso!');
                getProdutos();
            })
            .catch(error => console.error('Erro ao excluir produto:', error));
    }
}

function getMediaPrecoPorArmazem() {
    fetch(`${apiUrl}/media-preco-por-armazem`)
        .then(response => response.json())
        .then(mediaPrecoList => {
            const mediaPrecoListDiv = document.getElementById('mediaPrecoList');
            mediaPrecoListDiv.innerHTML = '<h3>Média de Preço por Armazém</h3>';

            mediaPrecoList.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <p><strong>Armazém:</strong> ${item.armazem.nome}</p>
                    <p><strong>Média de Preço:</strong> ${formatarReal(item.mediaPreco)}</p>
                    <hr>
                `;
                mediaPrecoListDiv.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Erro ao obter média de preço por armazém:', error));
}

function getValorTotalPorArmazem() {
    fetch(`${apiUrl}/vlr-total-produtos-por-armazem`)
        .then(response => response.json())
        .then(valorTotalPorArmazemList => {
            const valorTotalPorArmazemListDiv = document.getElementById('valorTotalPorArmazemList');
            valorTotalPorArmazemListDiv.innerHTML = '<h3>Valor Total de Produtos por Armazém</h3>';

            valorTotalPorArmazemList.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <p><strong>Armazém:</strong> ${item._id.nome}</p>
                    <p><strong>Valor Total:</strong> ${formatarReal(item.valorTotal)}</p>
                    <hr>
                `;
                valorTotalPorArmazemListDiv.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Erro ao obter valor total por armazém:', error));
}

function getValorTotalProdutos() {
    fetch(`${apiUrl}/vlr-total-produtos`)
        .then(response => response.json())
        .then(valorTotal => {
            const valorTotalProdutosDiv = document.getElementById('valorTotalProdutos');
            valorTotalProdutosDiv.innerHTML = `<h3>Valor Total de Produtos: ${formatarReal(valorTotal.valorTotal)}</h3>`;
        })
        .catch(error => console.error('Erro ao obter valor total de produtos:', error));
}

function formatarReal(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// Chamar as funções ao carregar a página
getMediaPrecoPorArmazem();
getValorTotalPorArmazem();
getValorTotalProdutos();
