// Récupération de la chaîne de requête dans l'URL du navigateur et Extraction de l'ID de l'URL
const productId = new URLSearchParams(window.location.search).get("id");
console.log(productId);

// On récupère les données de l'API correspondant à l'id
if (productId !== null) {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then((chooseProduct) => {
      console.log(chooseProduct);

      //Affichage sur la page product.html du canapé sélectionné sur la page d'accueil, à partir de l'id de l'URL
      // Ajout du nom du produit dans la balise title du navigateur
      document.title = chooseProduct.name;
      // Création d'une balise img manquante
      const img = document.createElement("img");
      // Récupération des données de l'API et destination des éléments
      img.src = chooseProduct.imageUrl;
      img.alt = chooseProduct.altTxt;
      document.getElementsByClassName("item__img")[0].appendChild(img);
      document.getElementById("title").innerText = chooseProduct.name;
      document.getElementById("price").innerText = chooseProduct.price + " ";
      document.getElementById("description").innerText =
        chooseProduct.description;

      // Boucle de rappel forEach pour ajouter toutes les couleurs en option suivant le produit choisi
      chooseProduct.colors.forEach(function (color) {
        const option = document.createElement("option");
        const select = document.getElementById("colors");

        // Récupération des données de l'API
        option.value = color;
        option.innerText = color;

        // Ajout de l'option à la sélection (select en HTML)
        select.appendChild(option);
      });

      // Récupération des données sélectionnées par l'utilisateur pour l'envoi vers le panier

      //Sélection du bouton Ajouter au panier
      const selectButtonCart = document.querySelector("#addToCart");
      // Envoyer des choix de l'utilisateur au clic
      selectButtonCart.addEventListener("click", (e) => {
        e.preventDefault();
        // Sélection de l'id pour le choix de la couleur
        const colorId = document.querySelector("#colors");
        // Insertion du choix de la couleur par l'utilisateur dans une variable
        choiceColor = colorId.value;
        // Sélection de l'id pour le choix de la quantité et insertion de la quantité choisie par l'utilisateur dans une variable
        const quantity = document.querySelector("#quantity");
        choiceQuantity = Number(quantity.value);
        console.log(choiceQuantity);

        // Récupération des données (id, couleur et quantité) après les choix faits par l'utilisateur,
        // si la couleur est bien sélectionnée,
        // ainsi que la quantité indiquée soit comprise entre 1 et 100 et un nombre entier
          if (
          choiceColor !== "" &&
          choiceQuantity > 0 &&
          choiceQuantity <= 100 &&
          Number.isInteger(choiceQuantity)
        ) {
          let optionsProduct = {
            idProduct: chooseProduct._id,
            colorProduct: choiceColor,
            quantityProduct: choiceQuantity,
          };
          console.log(optionsProduct);

          //------------------------------------------------Local Storage--------------------------------------------
          // On cré une variable pour afficher un message lors de l'ajout d'1 produit dans le localStorage
          let messageLocalStorage = false;
          //Fonction ajouter dans le localStorage un produit sélectionné par l'utilisatueur, avec ses options (id, couleur, quantité)
          const addProductLocalStorage = () => {
            // Si le produit et la couleur choisis existent déjà dans le localStorage alors on incrémente uniquement la quantité
            let findProduct = productsLocalStorage.find((a) => {
              return (
                a.idProduct === optionsProduct.idProduct &&
                a.colorProduct === optionsProduct.colorProduct
              );
            });
            if (findProduct) {
              const total =
                Number(findProduct.quantityProduct) +
                Number(optionsProduct.quantityProduct);
              if (total <= 100) {
                // On met la variable message sur false pour pouvoir afficher un message plus approprié
                messageLocalStorage = false;
                findProduct.quantityProduct =
                  Number(findProduct.quantityProduct) +
                  Number(optionsProduct.quantityProduct);
                alert(
                  `La quantité du produit ${chooseProduct.name} de couleur ${choiceColor} a bien été mise à jour.`
                );
              } else {
                // On met la variable message sur false pour pouvoir afficher un message plus approprié
                messageLocalStorage = false;
                alert(
                  "La quantité d'un article (même référence et même couleur) ne peut pas dépasser 100. Merci de rectifier la quantité choisie."
                );
              }
            }
            // Si le produit et la couleur choisis n'existent pas encore dans le localStorage alors on ajoute le produit et les options choisies
            else {
              // La variable message "true" s'affiche dans le localStorage
              messageLocalStorage = true;
              // Options du produit choisi dans une variable "productsLocalStorage"
              productsLocalStorage.push(optionsProduct);
            }

            // Transformation en format JSON et envoi des infos dans la clé "produit" du localStorage
            localStorage.setItem(
              "product",
              JSON.stringify(productsLocalStorage)
            );
          }; // Fin fonction addProductLocalStorage

          // Déclaration de la variable "productsLocalStorage" dans laquelle on récupère les keys et values
          // qui sont dans le localStorage afin de contrôler si le localStorage est vide ou non
          let productsLocalStorage = JSON.parse(
            localStorage.getItem("product")
          );
          // JSON.parse sert à convertir les données au format JSON qui sont dans le localStorage en objet javascript
          // si le localStorage contient déjà une clé "produit"
          if (productsLocalStorage) {
            addProductLocalStorage();
            console.log(productsLocalStorage);
          }
          // si le localStorage est vide
          else {
            productsLocalStorage = [];
            addProductLocalStorage();
            console.log(productsLocalStorage);
            // Affichage de ce message pour l'ajout du premier produit
            messageLocalStorage = false;
            alert(
              `Votre premier produit a été ajouté dans le panier ! `
            );
          }
          // Affichage de ce message, pour l'ajout du produit suivant :
          if (messageLocalStorage) {
            alert(
              `Le produit ${chooseProduct.name} de couleur ${choiceColor} a bien été ajouté au panier.`
            );
          }
        }
        // Si la couleur n'est pas sélectionnée ou la quantité non comprise entre 1 et 100 alors on affiche un message d'alerte
        else {
          alert(
            `La couleur n'est pas sélectionnée et/ou la quantité n'est pas comprise entre 1 et 100 ou n'est pas un nombre entier. Veuillez vérifier !`
          );
        }
      });
    })
    .catch((err) => {
      console.log(
        "Erreur : id du produit incorrect.",
        err
      );
      alert(`Produit sélectionné, non trouvé.`);
      window.location.href = "index.html";
    });
} else {
  console.log("Id du produit non indiqué dans l'url.");
  alert(`Produit sélectionné non trouvé.`);
  window.location.href = "index.html";
}
