const API = "https://atividade1-ruddy.vercel.app"

const formulario = document.getElementById("formulario")
const botaoEnviar = document.getElementById("botao-enviar")

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
        const resposta = await fetch(API + "/", {
            method: "POST",
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
        botaoEnviar.textContent = "Cadastrar"
    }
})