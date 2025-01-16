class GrupoRepository {
    
    grupos = {};

    criar(nomeGrupo, username) {
        if(this.grupos[nomeGrupo]){
            return false;
        }
        
        this.grupos[nomeGrupo] = {
            membros: [username],
            mensagens: []
        };

        return true;
    }

    pegarListaDeGrupos() {
        const listaGrupos = Object.keys(this.grupos);
        console.log(this.grupos);
        
        //console.log(listaGrupos);
        
        return listaGrupos;
    }

    entrar(nomeGrupo, username, socket) {
        if(!this.grupos[nomeGrupo]){
            return false;
        }

        this.grupos[nomeGrupo].membros.push(username);
        socket.join(nomeGrupo);
        
        console.log('Mensagens no grupo:', this.grupos[nomeGrupo].mensagens);

        return this.grupos[nomeGrupo].mensagens;
    }

    enviarMensagem(nomeGrupo, mensagem) {
        if(!this.grupos[nomeGrupo]){
            return false;
        }

        this.grupos[nomeGrupo].mensagens.push(mensagem);

        return true;
    }

    
}

module.exports = GrupoRepository;