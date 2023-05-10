const contaPersistencia = require('../persistencia/conta_persistencia')

async function buscarSaldo(id) {
    try{ 
        const saldo = await contaPersistencia.buscarSaldo(id);
        if(!saldo) {
            let erro = new Error();
            erro.message = "Conta nao encontrada";
            erro.status = 404;
            throw erro;
        }
        return saldo;
    }
    catch(err) { throw err; }
}

async function buscarPorId(id) {
    try{ 
        const conta = await contaPersistencia.buscarPorId(id);
        if(!conta) {
            let erro = new Error();
            erro.message = "Conta nao encontrada";
            erro.status = 404;
            throw erro;
        }
        return conta;
    }
    catch(err) { throw err; }
}


module.exports = {
    buscarSaldo,
    buscarPorId
}