async function cadastrarFilme() {
    const inputTitulo = document.getElementById("titulo")
    const inputGenero = document.getElementById("genero")
    const inputClassificacao = document.getElementById("classificacao")
    const inputDuracao = document.getElementById("duracao")

    if (inputTitulo.value === "" || inputGenero.value === "" || inputClassificacao.value === "" || inputDuracao.value === "") {
        alert("Preencha todas as informações!")
        return
    }

    const filme = {
        titulo: inputTitulo.value,
        genero: inputGenero.value,
        classificacao: inputClassificacao.valueAsNumber,
        duracao: inputDuracao.valueAsNumber
    }

    const informacoesAEnviar = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    }

    const resposta = await fetch("https://atividade1-ruddy.vercel.app/", informacoesAEnviar)
    const mensagemDecifrada = await resposta.json()

    alert(mensagemDecifrada.message)

    window.location.href = "../index.html"
}