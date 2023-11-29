# Sistema de Gerenciamento de Armazém Logístico

## Descrição do Projeto

Este projeto é um sistema de gerenciamento de armazém logístico desenvolvido em Node.js, Express.js e MongoDB. O objetivo é fornecer uma solução completa para o cadastro, consulta, atualização e exclusão de responsáveis, armazéns e produtos, possibilitando uma gestão eficiente do estoque.

## Estrutura do Projeto

### Controllers

- **responsavelController.js:** Responsável por lidar com operações relacionadas aos responsáveis, como obter, cadastrar, atualizar e excluir.

- **armazemController.js:** Controla as operações relacionadas aos armazéns, incluindo a obtenção da lista de armazéns, o cadastro, a atualização e a exclusão.

- **produtoController.js:** Gerencia as operações relacionadas aos produtos, como obtenção, cadastro, atualização e exclusão.

### Models

- **responsavelModel.js:** Define o modelo de dados para os responsáveis, incluindo nome e telefone.

- **armazemModel.js:** Estabelece o esquema para os armazéns, contendo informações como nome, localização, capacidade e o responsável associado.

- **produtoModel.js:** Define o modelo de dados para os produtos, incluindo nome, quantidade, data de validade e o identificador do armazém ao qual pertencem.

### Routes

- **responsavelRoutes.js:** Define as rotas relacionadas aos responsáveis, como obtenção, cadastro, atualização e exclusão.

- **armazemRoutes.js:** Estabelece as rotas para operações de armazéns, incluindo obtenção da lista, cadastro, atualização e exclusão.

- **produtoRoutes.js:** Define as rotas para operações de produtos, incluindo obtenção, cadastro, atualização e exclusão.

### app.js

O ponto de entrada da aplicação, onde são configurados o servidor Express, a conexão com o MongoDB e as rotas para responsáveis, armazéns e produtos. O servidor é iniciado na porta 4000.

## Funcionalidades Principais

1. **Responsáveis:**
   - Obter a lista de responsáveis.
   - Cadastrar um novo responsável.
   - Atualizar informações de um responsável.
   - Excluir um responsável.

2. **Armazéns:**
   - Obter a lista de armazéns com informações detalhadas do responsável associado.
   - Cadastrar um novo armazém.
   - Atualizar informações de um armazém.
   - Excluir um armazém.

3. **Produtos:**
   - Obter a lista de produtos com informações detalhadas do armazém associado.
   - Cadastrar um novo produto.
   - Atualizar informações de um produto.
   - Excluir um produto.

## Bibliotecas Utilizadas

O projeto faz uso das seguintes bibliotecas:

- **Express.js:** Framework web para Node.js. Facilita a criação de APIs e o gerenciamento de rotas.
  - Instalação: `npm install express`

- **Body-parser:** Middleware para o Express que facilita o processamento de dados do corpo das requisições.
  - Instalação: `npm install body-parser`

- **Mongoose:** ODM (Object Data Modeling) para MongoDB. Simplifica a interação com o banco de dados MongoDB.
  - Instalação: `npm install mongoose`

## Como Executar o Projeto

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

6. Acesse a aplicação em [http://localhost:4000](http://localhost:4000).

## Configurações Adicionais

Certifique-se de ter o MongoDB em execução localmente na porta padrão (27017) ou ajuste a URL de conexão no arquivo `app.js` conforme necessário. O sistema utiliza o Express.js para criar a API e o Mongoose como ODM para interagir com o MongoDB.

Sinta-se à vontade para explorar e adaptar o código conforme necessário para atender aos requisitos específicos do seu projeto. Para mais informações sobre as bibliotecas utilizadas, consulte a documentação oficial do [Express.js](https://expressjs.com/), [Body-parser](https://www.npmjs.com/package/body-parser) e [Mongoose](https://mongoosejs.com/).
