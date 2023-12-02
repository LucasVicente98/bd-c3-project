const apiUrl = 'http://localhost:4000/responsavel';

function getResponsaveis() {
    fetch(`${apiUrl}`)
        .then(response => response.json())
        .then(responsaveis => {
            const responsaveisList = document.getElementById('responsaveisList');
            responsaveisList.innerHTML = '<h3>Lista de Responsáveis</h3>';

            responsaveis.forEach(responsavel => {
                const responsavelDiv = document.createElement('div');
                responsavelDiv.innerHTML = `
                    <p><strong>Nome:</strong> ${responsavel.nome}</p>
                    <p><strong>Telefone:</strong> ${responsavel.telefone}</p>
                    <button onclick="editResponsavel('${responsavel._id}')">Editar</button>
                    <button onclick="deleteResponsavel('${responsavel._id}')">Excluir</button>
                    <hr>
                `;
                responsaveisList.appendChild(responsavelDiv);
            });
        })
        .catch(error => console.error('Erro ao obter responsáveis:', error));
}

function postResponsavel(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    const newResponsavel = {
        nome,
        telefone,
    };

    fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResponsavel),
    })
        .then(response => response.json())
        .then(data => {
            alert('Novo Responsável criado com sucesso!');
            getResponsaveis();
            getQtdeResponsaveis();
            getTotalArmazensPorResponsavel();
        })
        .catch(error => console.error('Erro ao criar responsável:', error));
}

function editResponsavel(responsavelId) {
    const newNome = prompt('Digite o novo nome para o responsável:');
    const newTelefone = prompt('Digite o novo telefone para o responsável:');

    if (newNome !== null && newTelefone !== null) {
        const updatedResponsavel = {
            nome: newNome,
            telefone: newTelefone,
        };

        fetch(`${apiUrl}/${responsavelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedResponsavel),
        })
            .then(response => response.json())
            .then(data => {
                alert('Responsável atualizado com sucesso!');
                getResponsaveis();
                getTotalArmazensPorResponsavel();
            })
            .catch(error => console.error('Erro ao atualizar responsável:', error));
    }
}

function deleteResponsavel(responsavelId) {
    const confirmDelete = confirm('Tem certeza de que deseja excluir este responsável?');

    if (confirmDelete) {
        fetch(`${apiUrl}/${responsavelId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert('Responsável excluído com sucesso!');
                getResponsaveis();
                getQtdeResponsaveis();
                getTotalArmazensPorResponsavel();
            })
            .catch(error => console.error('Erro ao excluir responsável:', error));
    }
}

function getQtdeResponsaveis() {
    fetch(`${apiUrl}/qtde-responsaveis`)
        .then(response => response.json())
        .then(data => {
            const qtdeResponsaveisDiv = document.getElementById('qtdeResponsaveis');
            qtdeResponsaveisDiv.innerHTML = `<p><strong>Quantidade Total de Responsáveis Cadastrados:</strong> ${data.totalResponsaveis}</p>`;
        })
        .catch(error => console.error('Erro ao obter quantidade total de responsáveis:', error));
}

function getTotalArmazensPorResponsavel() {
    fetch(`${apiUrl}/total-armazens`)
        .then(response => response.json())
        .then(data => {
            const totalArmazensPorResponsavelList = document.getElementById('totalArmazensPorResponsavelList');
            totalArmazensPorResponsavelList.innerHTML = '<h3>Quantidade de Armazéns por Responsável</h3>';

            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <p><strong>Responsável:</strong> ${item.responsavel}</p>
                    <p><strong>Quantidade de Armazéns:</strong> ${item.totalArmazens}</p>
                    <hr>
                `;
                totalArmazensPorResponsavelList.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Erro ao obter quantidade de armazéns por responsável:', error));
}

// Chamar as funções ao carregar a página
getQtdeResponsaveis();
getTotalArmazensPorResponsavel();
