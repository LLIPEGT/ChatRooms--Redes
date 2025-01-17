class GrupoRepository {
    
    grupos = {};

    criar(nomeGrupo) {
        if(this.grupos[nomeGrupo]){
            return false;
        }
        
        this.grupos[nomeGrupo] = {
            membros: [],
            mensagens: []
        };

        return true;
    }

    pegarListaDeGrupos() {
        const listaGrupos = Object.keys(this.grupos);
        console.log(this.grupos);
        
        return listaGrupos;
    }

    entrar(nomeGrupo, username, socket) {
        if(!this.grupos[nomeGrupo]){
            return false;
        }
        socket.join(nomeGrupo);
        this.grupos[nomeGrupo].membros.push(username);
        //console.log('Mensagens no grupo:', this.grupos[nomeGrupo].mensagens);
        console.log(this.grupos);
        

        return this.grupos[nomeGrupo].mensagens;
    }

    enviarMensagem(nomeGrupo, mensagem) {
        if(!this.grupos[nomeGrupo]){
            return false;
        }

        this.grupos[nomeGrupo].mensagens.push(mensagem);

        return true;
    }

    disconectarGrupoUser(nomeGrupo, username) {
        const index = this.grupos[nomeGrupo].membros.indexOf(username);
        this.grupos[nomeGrupo].membros.splice(index, 1);

        if(this.grupos[nomeGrupo].membros.length < 1 ) {
            delete this.grupos[nomeGrupo];
            console.log("Grupo deletado por falta de usuário: ", this.grupos);
        }

        return true;
    }

}

module.exports = GrupoRepository;