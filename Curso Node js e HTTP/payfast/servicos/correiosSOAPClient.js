var soap = require('soap');

function CorreiosSOAPClient() {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

module.exports = function() {
    return CorreiosSOAPClient;
}

CorreiosSOAPClient.prototype.calculaPrazo = function(args, callback) {
    soap.clientClient(this._url, function(erro, cliente) {
            console.log('client soap criado');
            cliente.CalcPrazo(args, callback);
        }
    );
}
/*callback -> funcao enviada*/