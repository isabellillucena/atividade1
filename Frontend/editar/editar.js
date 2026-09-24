const API = "https://atividade1-ruddy.vercel.app"

// Pega o id que veio no link: editar.html?id=5
const id = new URLSearchParams(window.location.search).get("id")

const formulario = document.getElementById("formulario")
const botaoEnviar = document.getElementById("botao-enviar")

async function carregarFilme() {
    if (!id) {
        alert("Filme não encontrado")
        window.location.href = "../index.html"
        return
    }

    try {
        // O backend não tem rota GET /:id, então busca todos e acha pelo id
        const resposta = await fetch(API + "/")
        const filmes = await resposta.json()
        const filme = filmes.find((item) => String(item.id) === id)

        if (!filme) {
            alert("Filme não encontrado")
            window.location.href = "../index.html"
            return
        }

        document.getElementById("titulo").value = filme.titulo
        document.getElementById("genero").value = filme.genero
        document.getElementById("duracao").value = filme.duracao

        const numero = parseInt(filme.classificacao)
        document.getElementById("classificacao").value =
            isNaN(numero) || numero <= 0 ? "Livre" : String(numero)
    } catch (erro) {
        console.log(erro)
        alert("Não foi possível carregar o filme")
    }
}

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    const filme = {
        titulo: document.getElementById("titulo").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        classificacao: document.getElementById("classificacao").value,
        duracao: Number(document.getElementById("duracao").value)
    }

    if (!filme.titulo || !filme.genero || !filme.classificacao || !filme.duracao) {
        alert("Preencha todas as informações!")
        return
    }

    botaoEnviar.disabled = true
    botaoEnviar.textContent = "Salvando…"

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filme)
        })
        const dados = await resposta.json()

        alert(dados.message)

        if (resposta.ok) {
            window.location.href = "../index.html"
        }
    } catch (erro) {
        console.log(erro)
        alert("Não foi possível conectar ao servidor")
    } finally {
        botaoEnviar.disabled = false
        botaoEnviar.textContent = "Salvar alterações"
    }
})

carregarFilme()