const contaNegocio = require('../negocio/conta_negocio')

async function buscarSaldo(req, res) {    
    //Obtem os dados request (e da URI)
    const id = req.params.id;
    try{ 
        //Trata a funcionalidade de negocio
        const saldo = await contaNegocio.buscarSaldo(id);
        //Gera o response adequadamente  
        res.json(saldo);
    }
    catch(err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});
        }
    }
}

module.exports = {
    buscarSaldo
}