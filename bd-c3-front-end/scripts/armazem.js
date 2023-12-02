const apiUrl = 'http://localhost:4000/armazem';

function getArmazens() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(armazens => {
            const armazensList = document.getElementById('armazensList');
            armazensList.innerHTML = '<h3>Lista de Armazéns</h3>';

            armazens.forEach(armazem => {
                const armazemDiv = document.createElement('div');
                armazemDiv.innerHTML = `
                    <p><strong>Nome:</strong> ${armazem.nome}</p>
                    <p><strong>Localização:</strong> ${armazem.localizacao}</p>
                    <p><strong>Capacidade:</strong> ${armazem.capacidade}</p>
                    <p><strong>Responsável:</strong> ${armazem.responsavel ? armazem.responsavel.nome : 'Sem Responsável'}</p>
                    <button onclick="editArmazem('${armazem._id}')">Editar</button>
                    <button onclick="deleteArmazem('${armazem._id}')">Excluir</button>
                    <hr>
                `;
                armazensList.appendChild(armazemDiv);
            });

            // Exibir a lista
            armazensList.style.display = 'block';
        })
        .catch(error => console.error('Erro ao obter armazéns:', error));
}

function postArmazem(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const localizacao = document.getElementById('localizacao').value;
    const capacidade = document.getElementById('capacidade').value;
    const responsavelId = document.getElementById('responsavelId').value;

    const newArmazem = {
        nome,
        localizacao,
        capacidade,
        responsavel: responsavelId,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArmazem),
    })
        .then(response => response.json())
        .then(data => {
            alert('Novo Armazém criado com sucesso!');
            getArmazens();
            getQtdeArmazens();
        })
        .catch(error => console.error('Erro ao criar armazém:', error));
}

function editArmazem(armazemId) {
    const newNome = prompt('Digite o novo nome para o armazém:');
    const newLocalizacao = prompt('Digite a nova localização para o armazém:');
    const newCapacidade = prompt('Digite a nova capacidade para o armazém:');

    if (newNome !== null && newLocalizacao !== null && newCapacidade !== null) {
        const updatedArmazem = {
            nome: newNome,
            localizacao: newLocalizacao,
            capacidade: newCapacidade,
        };

        fetch(`${apiUrl}/${armazemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedArmazem),
        })
            .then(response => response.json())
            .then(data => {
                alert('Armazém atualizado com sucesso!');
                getArmazens();
            })
            .catch(error => console.error('Erro ao atualizar armazém:', error));
    }
}

function deleteArmazem(armazemId) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este armazém?');

    if (confirmDelete) {
        fetch(`${apiUrl}/${armazemId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert('Armazém excluído com sucesso!');
                getArmazens();
                getQtdeArmazens();
            })
            .catch(error => console.error('Erro ao excluir armazém:', error));
    }
}

function getQtdeArmazens() {
    fetch(`${apiUrl}/qtde-armazens`)
        .then(response => response.json())
        .then(data => {
            const qtdeArmazensDiv = document.getElementById('qtdeArmazens');
            qtdeArmazensDiv.innerHTML = `<p><strong>Quantidade Total de Armazéns Cadastrados:</strong> ${data.totalArmazens}</p>`;
        })
        .catch(error => console.error('Erro ao obter quantidade total de armazéns:', error));
}

// Chamar as funções ao carregar a página
getQtdeArmazens();
