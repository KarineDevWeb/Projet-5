// en partant du fichier index.html, à la ligne 51, <section class="items" id="items">, je vais pouvoir trouver cet élément avec le code JavaScript
const items = document.querySelector("#items");
// je récupére toutes les données grâce à l'API
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        for (const addProducts of data){
            console.log(addProducts);
// j'ajoute les éléments manquants dans la page d'accueil (index.html) grâce aux données de l'API
    let newA = document.createElement("a"); 
    newA.setAttribute("href", `./product.html?id=${addProducts._id}`);
    items.appendChild(newA);

    let newArticle = document.createElement("article");
    newA.appendChild(newArticle);

    let newImg = document.createElement("img");
    newImg.setAttribute("src", addProducts.imageUrl);
    newImg.setAttribute("alt", addProducts.altTxt);
    newArticle.appendChild(newImg);

    let newH3 = document.createElement("h3");
    newH3.setAttribute("class", "productName");
    newH3.innerText = addProducts.name;
    newArticle.appendChild(newH3);

    let newP = document.createElement("p");
    newP.setAttribute("class", "productDescription"); 
    newP.innerText = addProducts.description;
    newArticle.appendChild(newP);
}
})
.catch(Error => {
    alert("une erreur s'est produite et ne perment pas d'afficher les produits de notre catalogue, veuillez nous en excuser");
    console.log("erreur fecth script.js, err");
})

// function addProducts(donnees) {
//     const id = donnees[0]._id
//     const anchor = makeAnchor(id)
//     appendChild(anchor)
// }

// function makeAnchor(id) {
// const anchor = document.createElement("a")
// anchor.href = "./product.html?id=" + id
// return anchor
// }

// function appendChild(anchor) {
// const items = document.querySelector("#items")
//  if (items != null) {
//         items.appendChild(anchor)
//     }
// }