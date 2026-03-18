async function buscar() {
    let serie = document.getElementById("busca").value
    let response = await fetch(`https://api.tvmaze.com/search/shows?q=` + serie)
    let dados = await response.json()

    let div = document.getElementById("resultados")
    div.innerHTML = ""

    dados.forEach(item => {
        let card = document.createElement("div")
        card.className = "card"

        let img = document.createElement("img")
        if (item.show.image) {
            img.src = item.show.image.medium
        } else {
            img.src = "https://via.placeholder.com/210x295?text=Sem+Capa" 
        }
        img.className = "poster"
        card.appendChild(img) 

        let titulo = document.createElement("span")
        titulo.textContent = item.show.name
        titulo.className = "titulo-serie"
        card.appendChild(titulo)

        let btn = document.createElement("button")
        btn.textContent = "Favoritar"
        btn.onclick = function() {
            if (!favoritos.includes(item.show.name)) {
                favoritos.push(item.show.name)
                salvar()
                mostrarFavoritos()
            } else {
                alert("Você já adicionou " + item.show.name + " aos favoritos!")
            }
        }
        card.appendChild(btn)

        div.appendChild(card)
    })
}

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []
mostrarFavoritos() 

function salvar() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
}

function mostrarFavoritos() {
    let ul = document.getElementById("favoritos")
    ul.innerHTML = ""

    favoritos.forEach(item => {
        let li = document.createElement("li")
        li.textContent = item

        let btnRemover = document.createElement("button")
        btnRemover.textContent = "X"
        btnRemover.className = "btn-remover"
        btnRemover.onclick = function() {
            favoritos = favoritos.filter(serieFav => serieFav !== item)
            salvar()
            mostrarFavoritos()
        }

        li.appendChild(btnRemover)
        ul.appendChild(li)
    })
}

document.getElementById("busca").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscar()
    }
})