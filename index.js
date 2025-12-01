require("dotenv").config();
require("dotenv").config(); 
const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net"
  );
  next();
});


// configurar o express para receber json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

const usuarioRoute = require("./routes/usuarioRoute");
app.use("/auth", usuarioRoute);

const mesaRoute = require("./routes/mesaRoute");

app.use("/mesa", mesaRoute);

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: true, msg: "Token não fornecido!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.PASSWORD_TOKEN);
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ erro: true, msg: "Token inválido!" });
  }
};

app.get("/areaLogada", verificarToken, (req, res) => {
  res.json({
    msg: `Você está logado com o ID: ${req.usuarioId} e pode acessar esta área.`,
  });
});

// rotas de usuario
const authRoute = require("./routes/authroutes");
const authController = require("./controllers/authcontroller");

//mudei o /usuario para /auth
app.use("/auth", authRoute);

// vereficar se vc esta logado
app.get(
  "/areaLogada",
  authController.vereficarAutentificacao,
  (req, res) => {
    res.json({
      msg:
        "vc está logando com o ID: " +
        req.authId +
        " e está permitido a acessar esta área logada",
    });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

module.exports = app;
