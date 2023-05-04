const {Client} = require("pg")

const conexao = {
    host: 'localhost',
    port: 5433,
    database: 'fintech',
    user: 'postgres',
    password: '123456'
};

async function listar() {
    //instanciar Client
    const cliente = new Client(conexao);
    const sql = "SELECT * FROM clientes";
    //Fazer a conexao
    cliente.connect();
    //Realizar a query
    try {
        const resultado = await cliente.query(sql);
        //fechar a conexao
        cliente.end();
        //trabalhar com o resultado.
        return resultado.rows;
    }
    catch(err){
        throw err;
    }
}

async function buscarPorId(id) {
    const cliente = new Client(conexao);
    const sql = "SELECT * FROM clientes WHERE id=$1";
    const values = [id];
    cliente.connect();
    try {
        const resultado = await cliente.query(sql,values);
        //fechar a conexao
        cliente.end();
        //trabalhar com o resultado.
        return resultado.rows[0];
    }
    catch(err){
        throw err;
    }

}

async function inserir(cliente) {
    const clienteConexao = new Client(conexao);
    const sql = "INSERT INTO clientes(cpf, nome, telefone) VALUES($1,$2,$3) RETURNING *";
    const values = [cliente.cpf, cliente.nome, cliente.telefone];
    clienteConexao.connect();
    try {
        const resultado = await clienteConexao.query(sql,values);
        //fechar a conexao
        clienteConexao.end();
        //trabalhar com o resultado.
        return resultado.rows[0];
    }
    catch(err){
        throw err;
    }
}

async function atualizar(id, cliente) {
    const clienteConexao = new Client(conexao);
    const sql = "UPDATE clientes SET cpf=$1, nome=$2, telefone=$3 WHERE id=$4  RETURNING *";
    const values = [cliente.cpf, cliente.nome, cliente.telefone, id];
    clienteConexao.connect();
    try {
        const resultado = await clienteConexao.query(sql,values);
        //fechar a conexao
        clienteConexao.end();
        //trabalhar com o resultado.
        return resultado.rows[0];
    }
    catch(err){
        throw err;
    }
}

async function deletar(id) {
    const cliente = new Client(conexao);
    const sql = "DELETE FROM clientes WHERE id=$1 RETURNING *";
    const values = [id];
    cliente.connect();
    try {
        const resultado = await cliente.query(sql,values);
        //fechar a conexao
        cliente.end();
        //trabalhar com o resultado.
        return resultado.rows[0];
    }
    catch(err){
        throw err;
    }
}

module.exports = { 
    listar, buscarPorId, inserir, atualizar, deletar
}