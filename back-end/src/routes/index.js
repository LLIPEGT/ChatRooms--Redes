const {Router} = require('express');


const routes = Router();

routes.get("/seila", () => {
    return "<h1> Olá, mundo </h1>";
})

module.exports = routes;