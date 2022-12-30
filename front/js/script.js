// en partant du fichier index.html, à la ligne 51, <section class="items" id="items">, je vais pouvoir trouver cet élément avec le code JavaScript

// je récupére toutes les données grâce à l'API
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

function addProducts(donnees) {
    const imageUrl = donnees[0].imageUrl

    // je créé l'élément "a", "href"  ET j'insère les données de l'API
    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.text = "KANAP SINOPE"
    const items = document.querySelector("#items")
    if (items != null) {
        items.appendChild(anchor)
    }
}