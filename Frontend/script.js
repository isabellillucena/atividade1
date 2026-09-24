const API = "https://atividade1-ruddy.vercel.app"

const lista = document.getElementById("lista")
const contagem = document.getElementById("contagem")

// Evita que um título com < ou > quebre a página
function escaparTexto(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, (caractere) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[caractere]))
}

// Transforma "Livre", 0, "12", 12 etc. em "L", "12"...
function normalizarClassificacao(valor) {
    const numero = parseInt(valor)
    if (isNaN(numero) || numero <= 0) return "L"
    return String(numero)
}

async function buscarFilmes() {
    try {
        const resposta = await fetch(API + "/")
        const filmes = await resposta.json()

        if (filmes.length === 0) {
            lista.innerHTML = ""
            contagem.textContent = "Nenhum filme cadastrado ainda"
            return
        }

        contagem.textContent = filmes.length === 1
            ? "1 filme no catálogo"
            : `${filmes.length} filmes no catálogo`

        lista.innerHTML = filmes.map((filme, indice) => {
            const classificacao = normalizarClassificacao(filme.classificacao)
            const descricao = classificacao === "L"
                ? "Livre para todos os públicos"
                : `Não recomendado para menores de ${classificacao} anos`

            return `
                <li class="filme">
                    <span class="filme-numero">${String(indice + 1).padStart(2, "0")}</span>
                    <div>
                        <h2 class="filme-titulo">${escaparTexto(filme.titulo)}</h2>
                        <p class="filme-info">${escaparTexto(filme.genero)} · ${escaparTexto(filme.duracao)} min</p>
                    </div>
                    <span class="classificacao classificacao-${classificacao}" title="${descricao}">${classificacao}</span>
                    <div class="acoes">
                        <a class="acao" href="editar/editar.html?id=${filme.id}">Editar</a>
                        <button class="acao acao-apagar" onclick="apagarFilme(${filme.id})">Apagar</button>
                    </div>
                </li>
            `
        }).join("")
    } catch (erro) {
        console.log(erro)
        contagem.textContent = "Não foi possível carregar os filmes"
    }
}

async function apagarFilme(id) {
    const confirmou = confirm("Tem certeza que deseja apagar este filme?")
    if (!confirmou) return

    try {
        const resposta = await fetch(`${API}/${id}`, { method: "DELETE" })
        const dados = await resposta.json()

        if (!resposta.ok) {
            alert(dados.message)
            return
        }

        buscarFilmes()
    } catch (erro) {
        console.log(erro)
        alert("Não foi possível conectar ao servidor")
    }
}

buscarFilmes()