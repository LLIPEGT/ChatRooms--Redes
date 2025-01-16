const socket = io();

socket.on('connect', () => {
    console.log('Conectado ao servidor Socket.IO');
});


const usernameInput = document.getElementById("username");
const criarGrupoBt = document.getElementById("criar-grupo");
const nomeDoGrupoInpt = document.getElementById("nome-do-grupo");
const listaDeGrupos = document.getElementById("lista-de-grupos");

let username = "";

usernameInput.addEventListener('input', (e) => {
    username = e.target.value;
});

criarGrupoBt.addEventListener('click', () => {
    const nomeGrupo = nomeDoGrupoInpt.value;

    if (username !== "" && nomeGrupo) {
        socket.emit('criar grupo', nomeGrupo, username);
    } else {
        alert("Insira um nome de usuário e um nome para o grupo");
    }
});

socket.on('atualizar lista', (grupos) => {
    grupos.forEach(grupo => {
        const newElementGrupo = document.createElement('li');
        newElementGrupo.textContent = grupo;
        listaDeGrupos.appendChild(newElementGrupo);
    });
});

socket.on('grupo criado', (nomeGrupo) => {
    alert(`Grupo ${nomeGrupo} criado com sucesso!`);
});

socket.on('ERRO', (mensagem) => {
    alert(mensagem);
});

window.onload = () => {
    socket.emit('pedir lista de grupos');
};
