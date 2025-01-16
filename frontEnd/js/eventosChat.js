const socket = io();

/*socket.on('connect', () => {
    console.log('Conectado ao servidor Socket.IO');
});*/

const listaDeMensagem = document.getElementById('lista-de-mensagem');
const mensagemInput = document.getElementById('mensagem');
const enviarMensagemBt = document.getElementById('enviar-mensagem')
const nomeGrupoElemento = document.getElementById('nome-do-grupo');
const usernameElement = document.getElementById('username');


const urlParametros = new URLSearchParams(window.location.search);
const nomeGrupo = urlParametros.get('grupo');
const username = urlParametros.get('username');

nomeGrupoElemento.textContent = nomeGrupo;
usernameElement.textContent = username;

socket.emit('entrar no grupo', nomeGrupo, username);

socket.on('mensagens passadas', (mensagens) => {
    mensagens.forEach(mensagem => {
        const newMensagem = document.createElement('li');
        newMensagem.textContent = `${mensagem.usuario}: ${mensagem.text}`;
        listaDeMensagem.appendChild(newMensagem);
    });
})

socket.on('enviar mensagem', (mensagem) => {
    const newMensagem = document.createElement('li');
    newMensagem.textContent = `${mensagem.usuario}: ${mensagem.text}`;
    listaDeMensagem.appendChild(newMensagem);
});

enviarMensagemBt.addEventListener('click', () => {
    const mensagemTexto = mensagemInput.value;
    if(mensagemTexto) {
        const mensagem = {usuario: username, text: mensagemTexto};
        socket.emit('enviar mensagem', nomeGrupo, mensagem );
        mensagemInput.value = " ";
    }
    else{
        alert('Digite uma mensagem!');
    }
});


