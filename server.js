const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const conexao = mysql.createConnection({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes_03MA"
});

app.get("/filmes", (req, res) => {

    conexao.query(
        "SELECT * FROM filmes_IsabellieLuiza",
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json(resultado);
        }
    );

});

app.post("/filmes", (req, res) => {

    const { titulo, genero, duracao, classificacao } = req.body;

    conexao.query(
        "INSERT INTO filmes_IsabellieLuiza (titulo, genero, duracao, classificacao) VALUES (?, ?, ?, ?)",
        [titulo, genero, duracao, classificacao],
        (erro) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json("Filme cadastrado!");
        }
    );

});

app.delete("/filmes/:id", (req, res) => {

    const id = req.params.id;

    conexao.query(
        "DELETE FROM filmes_IsabellieLuiza WHERE id = ?",
        [id],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: "Filme excluído com sucesso!"
            });

        }
    );

});

app.put("/filmes/:id", (req, res) => {

    const id = req.params.id;

    const {
        titulo,
        genero,
        duracao,
        classificacao
    } = req.body;

    conexao.query(
        "UPDATE filmes_IsabellieLuiza SET titulo = ?, genero = ?, duracao = ?, classificacao = ? WHERE id = ?",
        [titulo, genero, duracao, classificacao, id],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json(erro);
            }

            res.json({
                mensagem: "Filme atualizado com sucesso!"
            });

        }
    );

});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});