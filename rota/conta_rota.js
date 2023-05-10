const express = require("express");
const contaController = require("../controller/conta_controller")

const router = express.Router();

//api/contas
router.get('/:id/saldo',contaController.buscarSaldo)
router.get('/:id',contaController.buscarPorId)

module.exports = router;
