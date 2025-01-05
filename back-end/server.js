//Criação do servidor
const express = require('express');
const routes = require('./src/routes')

const app = express();
app.use(express.json);
app.use(routes)

const PORT = 8000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))