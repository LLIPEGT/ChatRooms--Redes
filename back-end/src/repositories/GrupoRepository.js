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
}

module.exports = GrupoRepository;