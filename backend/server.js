import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const PORT = 3000
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_IsabellieLuiza"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.post("/create-movie", (request, response) => {
    const { titulo, genero, classificacao, duracao } = request.body

    const insertCommand = "INSERT INTO filmes_IsabellieLuiza(titulo, genero, classificacao, duracao) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [titulo, genero, classificacao, duracao], (error) => {
        if(error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Filme criado com sucesso!"
            })
        }
    })
})

app.delete("/delete-movie/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_IsabellieLuiza WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme removido com sucesso!"
            })
        }
    })
})

app.put("/edit-movie/:id", (request, response) => {
    const { id } = request.params
    const { titulo, genero, classificacao, duracao } = request.body

    const updateCommand = "UPDATE filmes_IsabellieLuiza SET titulo = ?, genero = ?, classificacao = ?, duracao = ? WHERE id = ?"

    database.query(updateCommand, [titulo, genero, classificacao, duracao, id], (error) => {
        if (error) {
            console.log(error)
            return
        }
        
        response.json({
	        message: "Filme editado com sucesso!"
        })
    })})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

const database = mysql2.createPool({
    database: "alunos_filmes_03MA",
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    connectionLimit: 10
})