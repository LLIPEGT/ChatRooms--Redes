const GrupoRepository = require('../repositories/GrupoRepository')

const grupoRepository = new GrupoRepository();

class GrupoController {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        this.init();
    }

    init() {
        this.socket.on('criar grupo', (nomeGrupo, username) => this.criar(nomeGrupo, username));
        this.socket.on('pedir lista de grupos', () => this.pedirLista());
        this.socket.on('entrar no grupo', (nomeGrupo, username) => this.entrarGrupo(nomeGrupo, username));
        this.socket.on('enviar mensagem', (nomeGrupo, mensagem) => this.enviarMensagem(nomeGrupo, mensagem));

    }

    criar(nomeGrupo, username) {
        if(grupoRepository.criar(nomeGrupo, username)){
            this.socket.emit('grupo criado', nomeGrupo);

            this.io.emit("atualizar lista", grupoRepository.pegarListaDeGrupos())
        }

        else{
            this.socket.emit('ERRO', 'O grupo já existe');
        }
    }

    pedirLista() {
        this.io.emit("atualizar lista", grupoRepository.pegarListaDeGrupos())
    }

    entrarGrupo(nomeGrupo, username) {
        const entrar = grupoRepository.entrar(nomeGrupo, username, this.socket);
        if(entrar){
            this.socket.emit('mensagens passadas', entrar);
            this.io.to(nomeGrupo).emit('novo membro', username);
        }
        else{
            this.socket.emit('ERRO', 'Grupo não encontrado!');
        }
    }

    enviarMensagem(nomeGrupo, mensagem) {
        if(grupoRepository.enviarMensagem(nomeGrupo, mensagem)) {
            this.io.to(nomeGrupo).emit('enviar mensagem', mensagem);
        }
        else{
            this.socket.emit('ERRO', 'Erro ao enviar mensagem!');
        }
    }

}

module.exports = GrupoController;