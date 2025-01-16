const {Router} = require('express');

const GrupoRepository = require('../repositories/GrupoRepository')

const grupoRepository = new GrupoRepository();
const routes = express.Router();

routes.get("/", (req, res) => {
    res.json(grupoRepository.pegarListaDeGrupos());
})

module.exports = routes;