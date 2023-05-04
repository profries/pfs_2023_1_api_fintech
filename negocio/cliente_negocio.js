const clientePersistencia = require("../persistencia/cliente_persistencia");

let listaClientes = [];
let idAutoIncrement = 1;

async function listar() { 
    try{ 
        const listaClientes = await clientePersistencia.listar();
        return listaClientes;
    }
    catch(err) { throw err; }
}

async function inserir(cliente) {
    if(cliente && cliente.cpf && cliente.nome && cliente.telefone) {
        try {
            const clienteInserido = await clientePersistencia.inserir(cliente);
            return clienteInserido;
        }
        catch(err) { throw err; }
    }
    else {
        const erro = new Error();
        erro.message = "Falta parametros no cliente";
        erro.status = 400;
        throw erro;
    }
}

async function buscarPorId(id) {
    try{ 
        const cliente = await clientePersistencia.buscarPorId(id);
        if(!cliente) {
            let erro = new Error();
            erro.message = "Cliente nao encontrado";
            erro.status = 404;
            throw erro;
        }
        return cliente;
    }
    catch(err) { throw err; }
}

async function deletar(id) {
    try{ 
        const cliente = await clientePersistencia.deletar(id);
        if(!cliente) {
            let erro = new Error();
            erro.message = "Cliente nao encontrado";
            erro.status = 404;
            throw erro;
        }
        return cliente;
    }
    catch(err) { throw err; }
}

async function atualizar(id, novoCliente) {
    if(novoCliente && novoCliente.cpf && novoCliente.nome && novoCliente.telefone) {
        try {
            const clienteAtualizado = await clientePersistencia.atualizar(id,novoCliente);
            if(!clienteAtualizado) {
                let erro = new Error();
                erro.message = "Cliente nao encontrado";
                erro.status = 404;
                throw erro;
            }
            return clienteAtualizado;
        }
        catch(err) { throw err; }
    }
    else {
        const erro = new Error();
        erro.message = "Falta parametros no cliente";
        erro.status = 400;
        throw erro;
    }

}

module.exports = { 
    listar, 
    inserir, 
    buscarPorId, 
    deletar, 
    atualizar
}