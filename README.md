# Sistema de Gerenciamento de Armazém Logístico 📦

## Descrição do Projeto

Bem-vindo ao **Sistema de Gerenciamento de Armazém Logístico**! Este projeto, desenvolvido em Node.js, Express.js e MongoDB, visa simplificar o cadastro, consulta, atualização e exclusão de responsáveis, armazéns e produtos, proporcionando uma gestão eficiente do estoque.

**Diagrama ER**

![Diagrama ER do projeto](https://github.com/LucasVicente98/bd-c3-project/raw/main/diagram/DIAGRAMA_ER_PROJETO_C3.jpeg)

## Estrutura do Projeto

### Controllers 🎮

- **responsavelController.js:** Lida com operações relacionadas aos responsáveis, como obter, cadastrar, atualizar e excluir.

- **armazemController.js:** Gerencia operações relacionadas aos armazéns, incluindo a obtenção da lista, cadastro, atualização e exclusão.

- **produtoController.js:** Controla operações relacionadas aos produtos, como obter a lista, cadastrar, atualizar e excluir.

### Models 🏗️

- **responsavelModel.js:** Define o modelo de dados para os responsáveis, incluindo nome e telefone.

- **armazemModel.js:** Estabelece o esquema para os armazéns, contendo informações como nome, localização, capacidade e o responsável associado.

- **produtoModel.js:** Define o modelo de dados para os produtos, incluindo nome, quantidade, data de validade e o identificador do armazém ao qual pertencem.

### Routes 🛣️

- **responsavelRoutes.js:** Rotas relacionadas aos responsáveis.

- **armazemRoutes.js:** Rotas para operações de armazéns.

- **produtoRoutes.js:** Rotas para operações de produtos.

### app.js 🚀

O ponto de entrada da aplicação, onde são configurados o servidor Express, a conexão com o MongoDB e as rotas para responsáveis, armazéns e produtos. O servidor é iniciado na porta 4000.

## Funcionalidades Principais 🚀

1. **Responsáveis:**
   - **`GET /responsavel`**: Obtém a lista de responsáveis.
   - **`POST /responsavel`**: Cadastra um novo responsável.
   - **`PUT /responsavel/:id`**: Atualiza informações de um responsável pelo ID.
   - **`DELETE /responsavel/:id`**: Exclui um responsável pelo ID.
   - **`GET /responsavel/qtde-responsaveis`**: Retorna o total de responsáveis cadastrados.

2. **Armazéns:**
   - **`GET /armazem`**: Obtém a lista de armazéns com informações detalhadas do responsável associado.
   - **`POST /armazem`**: Cadastra um novo armazém.
   - **`PUT /armazem/:id`**: Atualiza informações de um armazém pelo ID.
   - **`DELETE /armazem/:id`**: Exclui um armazém pelo ID.
   - **`GET /armazem/qtde-armazens`**: Retorna o total de armazéns cadastrados.
   - **`GET /armazem/:id`**: Retorna as informações de um armazém pelo ID.

3. **Produtos:**
   - **`GET /produto`**: Obtém a lista de produtos com informações detalhadas do armazém associado.
   - **`POST /produto`**: Cadastra um novo produto.
   - **`PUT /produto/:id`**: Atualiza informações de um produto pelo ID.
   - **`DELETE /produto/:id`**: Exclui um produto pelo ID.
   - **`GET /produto/qtde-produtos`**: Retorna o total de produtos cadastrados.
   - **`GET /produto/vlr-total-produtos`**: Retorna o valor total de todos os produtos.
   - **`GET /produto/media-preco-por-armazem`**: Retorna a média de preço dos produtos por armazém.
   - **`GET /produto/vlr-total-produtos-por-armazem`**: Retorna o valor total dos produtos por armazém.

## Bibliotecas Utilizadas 📚

O projeto faz uso das seguintes bibliotecas:

- **Express.js:** Framework web para Node.js. Facilita a criação de APIs e o gerenciamento de rotas.
  - Instalação: `npm install express`

- **Body-parser:** Middleware para o Express que facilita o processamento de dados do corpo das requisições.
  - Instalação: `npm install body-parser`

- **Mongoose:** ODM (Object Data Modeling) para MongoDB. Simplifica a interação com o banco de dados MongoDB.
  - Instalação: `npm install mongoose`

## Como Executar o Projeto ▶️

1. Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

2. Clone o repositório:

   ```bash
   git clone https://github.com/LucasVicente98/bd-c3-project.git
   ```

3. Navegue até o diretório do projeto:

   ```bash
   cd bd-c3-project
   ```

4. Instale as dependências:

   ```bash
   npm install
   ```

5. Inicie o servidor:

   ```bash
   node app.js
   ```

6. Acesse a aplicação em [http://localhost:4000]([http://localhost:4000](http://172.18.240.1:5500/bd-c3-front-end/menu_armazem.html).

## Configurações Adicionais ⚙️

Certifique-se de ter o MongoDB em execução localmente na porta padrão (27017) ou ajuste a URL de conexão no arquivo `app.js` conforme necessário. O sistema utiliza o Express.js para criar a API e o Mongoose como ODM para interagir com o MongoDB.

Sinta-se à vontade

 para explorar e adaptar o código conforme necessário para atender aos requisitos específicos do seu projeto. Para mais informações sobre as bibliotecas utilizadas, consulte a documentação oficial do [Express.js](https://expressjs.com/), [Body-parser](https://www.npmjs.com/package/body-parser) e [Mongoose](https://mongoosejs.com/).
