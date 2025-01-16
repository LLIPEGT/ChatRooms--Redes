//Criação do servidor
const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');
const GrupoController = require('../back-end/src/controllers/GrupoController')
const path = require('path');

const app = express();
const server = createServer(app);
const io = new Server(server);
const salasPath = path.join(__dirname, '..', 'frontEnd', 'salas.html');
//console.log('Caminho para o arquivo:', salasPath); TESTE

app.use(express.static(path.join(__dirname, '..', 'frontEnd')));
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/../frontEnd/salas.html'); Forma errada
    res.sendFile(salasPath);
})

io.on('connection', (socket) => {
    console.log(`Novo usuario conectado: ${socket.id}`);

    new GrupoController(socket, io);
})



const PORT = 8000;

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));