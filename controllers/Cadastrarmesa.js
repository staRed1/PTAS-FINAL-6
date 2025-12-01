const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class CadastroMesa {
  static async cadastrar(req, res) {
    try {
      const { numeroMesa, quantidadeAcentos } = req.body;

      if (!numeroMesa || !quantidadeAcentos) {
        return res.status(400).json({
          erro: true,
          msg: "Número da mesa e quantidade de acentos são obrigatórios!"
        });
      }

      const novaMesa = await prisma.mesa.create({
        data: {
          numeroMesa: parseInt(numeroMesa),
          quantidadeAcentos: parseInt(quantidadeAcentos)
        }
      });

      return res.status(200).json({
        erro: false,
        msg: "Mesa cadastrada com sucesso!",
        mesa: novaMesa
      });

    } catch (error) {
      console.error("ERRO NO CADASTRO =", error);

      return res.status(500).json({
        erro: true,
        msg: "Erro interno no servidor"
      });
    }
  }
}

module.exports = CadastroMesa;
