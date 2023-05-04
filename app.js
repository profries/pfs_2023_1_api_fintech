const express = require('express');
const clienteRota = require('./rota/cliente_rota')
const contaRota = require('./rota/conta_rota')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/clientes", clienteRota);
app.use("/api/contas", contaRota);

app.listen (3000, () => { 
    console.log("Servidor iniciado...");
})