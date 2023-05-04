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
    const sql = "SELECT * FROM contas LEFT JOIN clientes ON contas.cliente_id = clientes.id WHERE contas.id=$1";
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

/*module.exports = {
    buscarSaldo
}*/

async function main() {
    console.log("2: ",await buscarPorId(2));
}

main();