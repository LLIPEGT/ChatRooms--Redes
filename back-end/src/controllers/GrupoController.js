const GrupoRepository = require('../repositories/GrupoRepository')

const grupoRepository = new GrupoRepository();

class GrupoController {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
        this.init();
    }

    init() {
        this.socket.on('criar grupo', (nomeGrupo) => this.criar(nomeGrupo));
        this.socket.on('pedir lista de grupos', () => this.pedirLista());
        this.socket.on('entrar no grupo', (nomeGrupo, username) => this.entrarGrupo(nomeGrupo, username));
        this.socket.on('enviar mensagem', (nomeGrupo, mensagem) => this.enviarMensagem(nomeGrupo, mensagem));
        this.socket.on('disconectar', (nomeGrupo, username) => this.disconectarDoGrupo(nomeGrupo, username));
    }

    criar(nomeGrupo) {
        if(grupoRepository.criar(nomeGrupo)){
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
            this.conectarUsuario();
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

    conectarUsuario () {
        console.log(`Novo usuario conectado: ${this.socket.id}`);
    }

    disconectarDoGrupo (nomeGrupo, username) {
        if(grupoRepository.disconectarGrupoUser(nomeGrupo, username)) {
            this.socket.emit("Usuario desconectado", nomeGrupo, username)
        }
        else{
            this.socket.emit('ERRO', 'Erro ao desconectar usuario !');
        }
    }
}

module.exports = GrupoController;