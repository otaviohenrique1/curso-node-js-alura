var mysql = require('mysql');
function createDBConnection() {
    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs'
        });
    }

    if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs_test'
        });
    }

    /*if(process.env.NODE_ENV == 'production') {
        var urlDeConexao = process.env.CLEAERDB_DATABASE_URL;
        var grupos = urlDeConexao.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        return mysql.createConnection({
            host:grupos[3],
			user:grupos[1],
			password:grupos[2],
			database:grupos[4]
        });
    }*/
}

// Wrapper -> funcao que embrulha outra funcao
module.exports = function() {
    return createDBConnection;
}