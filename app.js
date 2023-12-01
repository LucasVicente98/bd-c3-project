const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 4000;
const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'armazem-logistico';

app.use(bodyParser.json());

mongoose.connect(`${mongoUrl}/${dbName}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', function () {
    console.log('Conectado ao MongoDB');
});

const responsavelRouter = require('./routes/responsavelRoutes');
const armazemRouter = require('./routes/armazemRoutes');
const produtoRouter = require('./routes/produtoRoutes');

app.use('/responsavel', responsavelRouter);
app.use('/armazem', armazemRouter);
app.use('/produto', produtoRouter);

app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
