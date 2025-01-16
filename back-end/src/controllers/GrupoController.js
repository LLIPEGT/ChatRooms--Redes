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
        this.socket.on('entrar no grupo', (nomeGrupo, username) => this.entrarGrupo(nomeGrupo, username));
        this.socket.on('pedir lista de grupos', () => this.pedirLista())

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
}

module.exports = GrupoController;