// var connectionFactory = require('../infra/connectionFactory');
module.exports = function(app) {
    app.get('/produtos', function(req,res,next){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros, resultados){
            if (erros) {
                return next(erros);
            }
            res.format({
                html: function() {
                    res.render('produtos/lista',{lista:resultados});
                },
                json: function() {
                    res.json(resultados);
                }
            });
            res.render('produtos/lista', {lista:resultados});
        });
        connection.end();
    });

    app.get('/produtos/json', function(req,res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros, resultados){
            res.json(resultados);
        });
        connection.end();
    });
    
    app.get('/produtos/form', function(req, res){
        res.render('produtos/form', {errosValidacao:{}, produto:{}});
    });

    app.post('/produtos', function(req, res){
        var produto = req.body;

        req.assert('titulo', 'Titulo é obrigatório').notEmpty();
        req.assert('preco', 'Formato invalido').isFloat();

        var erros = req.validationErrors();
        if(erros) {
            res.format({
                html: function(){
                    res.status(400).render('produtos/form',{errosValidacao:erros,produto:produto});
                },
                json: function(){
                    res.status(400).json(erros);
                }
                /*400 -> request de dados invalidos no http */
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto,function(erros,resultados){
            res.redirect('/produtos');
        });
    });
}