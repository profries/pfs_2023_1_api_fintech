const clienteNegocio = require("../negocio/cliente_negocio");

async function listar(req, res) {    
    //Obtem os dados request
    //Trata a funcionalidade de negocio
    try{
        console.log(">> Controller 1")
        const listaClientes = await clienteNegocio.listar();
        //Gera o response adequadamente
        console.log(">> Controller 2")
        res.json(listaClientes);  
    } 
    catch(err) {
        res.status(500).json({erro: err})
    }
}

async function buscarPorId(req, res) {    
    //Obtem os dados request (e da URI)
    const id = req.params.id;
    try{ 
        //Trata a funcionalidade de negocio
        const cliente = await clienteNegocio.buscarPorId(id);
        //Gera o response adequadamente  
        res.json(cliente);
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

async function inserir(req, res) {    
    //Obtem os dados request
    const cliente = req.body;
    //Trata a funcionalidade de negocio
    try{ 
        const clienteInserido = await clienteNegocio.inserir(cliente);
        //Gera o response adequadamente  
        res.status(201).json(clienteInserido);
    } 
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});
        }
    }
}

async function atualizar(req, res) {    
    //Obtem os dados request
    const id = req.params.id;
    const cliente = req.body;

    //Trata a funcionalidade de negocio
    try{ 
        const clienteAtualizado = await clienteNegocio.atualizar(id, cliente);
        //Gera o response adequadamente  
        res.json(clienteAtualizado);
    } 
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});
        }
    }
}

async function deletar(req, res) {    
    //Obtem os dados request
    const id = req.params.id;
    try{ 
        //Trata a funcionalidade de negocio
        const cliente = await clienteNegocio.deletar(id);
        //Gera o response adequadamente  
        res.json(cliente);
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
    listar,
    buscarPorId,
    inserir,
    atualizar,
    deletar
}