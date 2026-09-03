async function buscarFilmes() {
    // ir ao backend, acessar a rota GET e mostrar os filmes na tela.
    const resposta = await fetch("https://atividade1-ruddy.vercel.app/")
    const filmes = await resposta.json()
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.titulo}</h2>
                <p><strong>Genero:</strong> ${filme.genero}</p>
                <p><strong>Duracao:</strong> ${filme.duracao} minutos</p>
                <p><strong>Classificacao indicativa:</strong> ${filme.classificacao > 0 ? filme.classificacao + ' anos' : 'Livre'}</p>
            </div>
        `
    })
}

buscarFilmes()