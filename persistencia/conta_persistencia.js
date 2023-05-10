const {Client} = require("pg")

const conexao = {
    host: 'localhost',
    port: 5433,
    database: 'fintech',
    user: 'postgres',
    password: '123456'
};

async function buscarSaldo(id) {
    //instanciar Client
    const cliente = new Client(conexao);
    const sql = "SELECT saldo FROM contas WHERE id=$1";
    const values = [id];
    //Fazer a conexao
    cliente.connect();
    //Realizar a query
    try {
        const resultado = await cliente.query(sql, values);
        //fechar a conexao
        cliente.end();
        //trabalhar com o resultado.
        return resultado.rows[0];
    }
    catch(err){
        throw err;
    }
}

async function buscarPorId(id) {
    //instanciar Client
    const cliente = new Client(conexao);
    const sql = `SELECT contas.id as id, contas.saldo as saldo, contas.status as status,
            clientes.id as clientes_id, clientes.cpf as clientes_cpf, 
            clientes.nome as clientes_nome, clientes.telefone as clientes_telefone
            FROM contas 
            LEFT JOIN clientes ON contas.cliente_id = clientes.id 
            WHERE contas.id=$1`;
    const values = [id];
    //Fazer a conexao
    cliente.connect();
    //Realizar a query
    try {
        const resultado = await cliente.query(sql, values);
        //fechar a conexao
        cliente.end();
        //trabalhar com o resultado.
        if(resultado.rows[0]) {
            let conta = {};
            conta.id = resultado.rows[0].id;
            conta.saldo = resultado.rows[0].saldo;
            conta.status = resultado.rows[0].status;
            conta.cliente = {};
            conta.cliente.id = resultado.rows[0].clientes_id;
            conta.cliente.cpf = resultado.rows[0].clientes_cpf;
            conta.cliente.nome = resultado.rows[0].clientes_nome;
            conta.cliente.telefone = resultado.rows[0].clientes_telefone;
            return conta;
        }        
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    buscarSaldo,
    buscarPorId
}

// async function main() {
//     console.log("2: ",await buscarPorId(1));
// }

// main();