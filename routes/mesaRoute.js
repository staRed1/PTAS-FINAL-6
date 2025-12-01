const express = require("express");
const path = require("path");

const { PrismaClient } = require("@prisma/client");

const ReservaMesa = require("../controllers/ReservaMesa");
const CadastroMesa = require("../controllers/Cadastrarmesa");

const router = express.Router();

// cadastro de mesa
router.get("/cadastromesa", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/cadastrarMesa.html"));
});
router.post("/cadastromesa", CadastroMesa.cadastrar);

// reserva de mesa
router.get("/reservamesa", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/reservaMesa.html"));
});

router.post("/reservamesa", ReservaMesa.cadastrar);


module.exports = router;
