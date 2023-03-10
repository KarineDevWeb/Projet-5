// en partant du fichier index.html, ligne 51, <section class="items" id="items">
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
// message d'erreur :
.catch(Err => {
    alert(`une erreur s'est produite et ne permet pas d'afficher les produits, veuillez nous en excuser`);
    console.log("erreur fecth script.js", Err);
})