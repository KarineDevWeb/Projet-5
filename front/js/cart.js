// TITRE DE LA PAGE
document.title = "Panier";

// Déclaration variable "listProductInLocalStorage" auquel on ajoute les clés et valeurs dans le localStorage
// pour convertir les données au format JSON dans le localStorage en objet javascript, on utilise JSON.parse
let listProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
// console.log(listProductInLocalStorage);

// Insertion informations produits dans la balise de la page product.html
const positionProductsHtml = document.getElementById("cart__items");

// DECLARATIONS DES VARIABLES
let productsCart = [];
// Variables pour calculer la quantité total de produits, le coût total du panier :
let totalQuantity = 0;
let totalPrice = 0;
let quantityProductCart = 0;
let priceProductCart = 0;
let totalProductPriceCart = 0;
let myProducts = [];
const findProducts = 0;

// Variables utilisées dans la fonction supprimer :
let idDelete = 0;
let colorDelete = 0;

// Variables utilisées pour valider la commande du panier :
const buttonOrder = document.getElementById("order");

let errorFormulaireFirstName = true;
let errorFormulaireLastName = true;
let errorFormulaireAddress = true;
let errorFormulaireCity = true;
let errorFormulaireEmail = true;

// LES DIFFERENTES FONCTIONS
// Quantité total dans le panier(chargement page panier.html)
function totalProductsQuantity() {
  totalQuantity += parseInt(quantityProductCart);
  console.log("Total quantité panier", totalQuantity);
  document.getElementById("totalQuantity").innerText = totalQuantity;
}

// montant total panier (chargement page panier.html)
function totalProductsPrice() {
  // prix total de chaque produit : quantité x prix unitaire
  totalProductPriceCart = quantityProductCart * priceProductCart;
  // console.log(totalProductPriceCart);
  // prix total du panier
  totalPrice += totalProductPriceCart;
  console.log("total prix panier", totalPrice);
  document.getElementById("totalPrice").innerText = totalPrice;
}

function totaux() {
  totalProductsQuantity();
  totalProductsPrice();
}

// Modification de la quantité, suppression d'un produit : recalcule la quantité total dans le panier :
function recalculationTotalQuantity() {
  let newTotalQuantity = 0;
  for (const item of listProductInLocalStorage) {
    // Quantité total de produits dans le localStorage :
    newTotalQuantity += parseInt(item.quantityProduct);
  }
  console.log("nouveau total panier", newTotalQuantity);
  // Affichage de la nouvelle quantité totale des produits :
  document.getElementById("totalQuantity").innerText = newTotalQuantity;
}

// Modification de la quantité, suppression d'un produit : recalcule le montant total dans le panier
function recalculationTotalPrice() {
  let newTotalPrice = 0;
  // "boucle for" sur la listProductInLocalStorage :
  for (const item of listProductInLocalStorage) {
    const idProductsLocalStorage = item.idProduct;
    const quantityProductsLocalStorage = item.quantityProduct;
    // puis vérification si l'id correspond :
    const findProducts = myProducts.find(
      (element) => element._id === idProductsLocalStorage
    );
    // S'il y a un produit, on récupère le prix :
    if (findProducts) {
      const newTotalProductPriceCart =
        findProducts.price * quantityProductsLocalStorage;
      newTotalPrice += newTotalProductPriceCart;
      console.log("nouveau prix total panier", newTotalPrice);
    }
    // Affichage du nouveau prix total du panier (dans html) :
    document.getElementById("totalPrice").innerText = newTotalPrice;
  }
}

// Modification de la quantité d'un produit du panier
let messageErrorQuantity = false;
// Fonction pour changer la quantité
function changeQuantity() {
  let changeQuantity = document.querySelectorAll(".itemQuantity");
  changeQuantity.forEach((item) => {
    // Permet d'écouter l'événement, la modification de la quantité (sur l'input itemQuantity)
    item.addEventListener("change", (event) => {
      // Si l'événement n'est pas réussi,  l'action par défaut ne sera pas exécutée comme elle devrait l'être normalement
      event.preventDefault();
      choiceQuantity = Number(item.value);
      let myArticle = item.closest("article");
      // On récupére le produit avec la même couleur pour modifier la quantité, dans le localStorage
      let selectMyArticleInLocalStorage = listProductInLocalStorage.find(
        (element) =>
          element.idProduct === myArticle.dataset.id &&
          element.colorProduct === myArticle.dataset.color
      );

      // Mise à jour de la quantité dans le localStorage, le DOM (Quantité comprise entre 1 et 100)
      if (
        choiceQuantity > 0 &&
        choiceQuantity <= 100 &&
        Number.isInteger(choiceQuantity)
      ) {
        selectMyArticleInLocalStorage.quantityProduct =
          parseInt(choiceQuantity);
        localStorage.setItem(
          "product",
          JSON.stringify(listProductInLocalStorage)
        );
        // recalcule de la quantité et du prix total du panier
        recalculationTotalQuantity();
        recalculationTotalPrice();
        messageErrorQuantity = false;
      }
      // indication d'un message d'erreur
      else {
        item.value = selectMyArticleInLocalStorage.quantityProduct;
        messageErrorQuantity = true;
      }
      if (messageErrorQuantity) {
        alert("la quantité doit être comprise entre 1 et 100");
      }
    });
  });
}

// Suppression d'un produit dans le panier
function deleteProduct() {
  let selectRemove = document.querySelectorAll(".deleteItem");
  selectRemove.forEach((selectRemove) => {
    selectRemove.addEventListener("click", (e) => {
      //
      let myArticle = selectRemove.closest("article");
      // console.log(myArticle);
      //
      listProductInLocalStorage = listProductInLocalStorage.filter(
        (element) =>
          element.idProduct !== myArticle.dataset.id ||
          element.colorProduct !== myArticle.dataset.color
      );
      // Mise à jour du localStorage
      localStorage.setItem(
        "product",
        JSON.stringify(listProductInLocalStorage)
      );
      // Alerte suppression d'un produit
      alert("Attention, ce produit va être supprimé du panier");

      // Suppression de la balise <article> du produit, depuis son parent, si existe
      if (myArticle.parentNode) {
        myArticle.parentNode.removeChild(myArticle);
      }

      //  Si panier vide alors affichage : panier vide
      if (
        listProductInLocalStorage === null ||
        listProductInLocalStorage.length === 0
      ) {
        messagePanierVide();
      } else {
        // Recalcul quantité et prix total du panier
        recalculationTotalPrice();
        recalculationTotalQuantity();
      }
    });
  });
}
// Affichage message "le panier est vide"
function messagePanierVide() {
  productsCart = "Le panier est vide";
  // Création d'un nouvel élément h2 "nom du produit" pour l'insérer dans le DOM:
  let newH2 = document.createElement("h2");
  // L'élément ajouté en tant qu'enfant
  positionProductsHtml.appendChild(newH2);
  newH2.innerText = productsCart;
  // Insertion du chiffre dans html
  document.getElementById("totalQuantity").innerText = 0;
  document.getElementById("totalPrice").innerText = 0;
}

// Contrôle des infos sur l'utilisateur
let textRegex = new RegExp(
  "^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$"
);
let addressRegex = new RegExp(
  "^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$"
);
let emailRegex = new RegExp(
  "^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$"
);

// FORMULAIRE / coordonnées :
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let myAddress = document.getElementById("address");
let myCity = document.getElementById("city");
let myEmail = document.getElementById("email");

// variables pour vérification valeur champs de formulaire
let valueFirstName;
let valueLastName;
let valueMyAddress;
let valueMyCity;
let valueMyEmail;

firstName.addEventListener("change", function () {
  let firstNameErrorMsg = firstName.nextElementSibling;
  valueFirstName = textRegex.test(firstName.value);
  if (valueFirstName) {
    firstNameErrorMsg.innerText = "";
    errorFormulaireFirstName = false;
  } else {
    firstNameErrorMsg.innerText = "veuillez indiquer un prénom valide";
    errorFormulaireFirstName = true;
  }
});

lastName.addEventListener("change", function () {
  let lastNameErrorMsg = lastName.nextElementSibling;
  valueLastName = textRegex.test(lastName.value);
  if (valueLastName) {
    lastNameErrorMsg.innerText = "";
    errorFormulaireLastName = false;
  } else {
    lastNameErrorMsg.innerText = "veuillez indiquer un nom valide";
    errorFormulaireLastName = true;
  }
});

myAddress.addEventListener("change", function () {
  let addressErrorMsg = myAddress.nextElementSibling;
  valueMyAddress = addressRegex.test(myAddress.value);
  if (valueMyAddress) {
    addressErrorMsg.innerText = "";
    errorFormulaireAddress = false;
  } else {
    addressErrorMsg.innerText = "veuillez indiquer une adresse correcte";
    errorFormulaireAddress = true;
  }
});

myCity.addEventListener("change", function () {
  let cityErrorMsg = myCity.nextElementSibling;
  valueMyCity = textRegex.test(myCity.value);
  if (valueMyCity) {
    cityErrorMsg.innerText = "";
    errorFormulaireCity = false;
  } else {
    cityErrorMsg.innerText = "veuillez indiquer la ville";
    errorFormulaireCity = true;
  }
});

myEmail.addEventListener("change", function () {
  let emailErrorMsg = myEmail.nextElementSibling;
  valueMyEmail = emailRegex.test(myEmail.value);
  if (valueMyEmail) {
    emailErrorMsg.innerText = "";
    errorFormulaireEmail = false;
  } else {
    emailErrorMsg.innerText = "veuillez indiquer un email correct";
    errorFormulaireEmail = true;
  }
});

// Affichage produits dans localStorage
// Si panier vide alors affichage "le panier est vide"
if (
  listProductInLocalStorage === null ||
  listProductInLocalStorage.length === 0
) {
  messagePanierVide();
  buttonOrder.addEventListener("click", (event) => {
    alert("Le panier est vide");
    event.preventDefault();
  });
}

// si panier avec produit alors affichage du localStorage
else {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      myProducts = data;

      // Récupération de l'Id, quantité, prix dans le localStorage
      for (let g = 0; g < listProductInLocalStorage.length; g++) {
        let colorProductCart = listProductInLocalStorage[g].colorProduct;
        let idProductCart = listProductInLocalStorage[g].idProduct;
        quantityProductCart = listProductInLocalStorage[g].quantityProduct;

        const productsCart = data.find(
          (element) => element._id === idProductCart
        );
        // Récupération du prix des produits dans variable "priceProductCart"
        priceProductCart = productsCart.price;

        // Il manque des éléments (couleurs, référence des produits), on va les créer
        // dans cart.html : se référer à la balise <article class="cart__item"
        let newArticle = document.createElement("article");
        newArticle.setAttribute("class", "cart__item");
        newArticle.setAttribute("data-id", `${idProductCart}`);
        newArticle.setAttribute("data-color", `${colorProductCart}`);
        positionProductsHtml.appendChild(newArticle);

        let newDivImg = document.createElement("div");
        newDivImg.setAttribute("class", "cart__item__img");
        newArticle.appendChild(newDivImg);

        // Création de la balise image afin d'intégrer la photo du produit
        let newImg = document.createElement("img");
        newImg.setAttribute("src", productsCart.imageUrl);
        newImg.setAttribute("alt", productsCart.altTxt);
        // Ajouter notre nouvel élément "image" dans les enfants de l'élément "div"
        newDivImg.appendChild(newImg);

        // Création de la balise div class "cart__item__content"
        let newDivContent = document.createElement("div");
        newDivContent.setAttribute("class", "cart__item__content");
        newArticle.appendChild(newDivContent);

        // Création de la balise div class "cart__item__content__description"
        let newDivContentDescription = document.createElement("div");
        newDivContentDescription.setAttribute(
          "class",
          "cart__item__content__description"
        );
        newDivContent.appendChild(newDivContentDescription);

        // Création de la balise h2 pour le nom du produit
        let newH2 = document.createElement("h2");
        newH2.innerText = productsCart.name;
        newDivContentDescription.appendChild(newH2);

        // Création de la balise p pour la couleur
        let newPColor = document.createElement("p");
        newPColor.innerText = colorProductCart;
        newDivContentDescription.appendChild(newPColor);

        // Création de la balise p pour le prix
        let newPPrice = document.createElement("p");
        newPPrice.innerText = productsCart.price + " €";
        newDivContentDescription.appendChild(newPPrice);

        // Création div class "cart__item__content__settings"
        let newDivContentSettings = document.createElement("div");
        newDivContentSettings.setAttribute(
          "class",
          "cart__item__content__settings"
        );
        newDivContent.appendChild(newDivContentSettings);

        // Création  div class "cart__item__content__settings__quantity"
        let newDivContentSettingsQuantity = document.createElement("div");
        newDivContentSettingsQuantity.setAttribute(
          "class",
          "cart__item__content__settings__quantity"
        );
        newDivContentSettings.appendChild(newDivContentSettingsQuantity);

        // Création de la balise p pour le texte
        let newPQuantity = document.createElement("p");
        newPQuantity.innerText = "Qté : ";
        newDivContentSettingsQuantity.appendChild(newPQuantity);

        // Création de la balise input class= "itemQuantity"
        let newPInput = document.createElement("input");
        newPInput.setAttribute("type", "number");
        newPInput.setAttribute("class", "itemQuantity");
        newPInput.setAttribute("name", "itemQuantity");
        newPInput.setAttribute("min", "1");
        newPInput.setAttribute("max", "100");
        newPInput.setAttribute("value", `${quantityProductCart}`);
        newDivContentSettingsQuantity.appendChild(newPInput);

        // Création de la balise div class cart__item__content__settings__delete
        let newDivContentSettingsDelete = document.createElement("div");
        newDivContentSettingsDelete.setAttribute(
          "class",
          "cart__item__content__settings__delete"
        );
        newDivContentSettings.appendChild(newDivContentSettingsDelete);

        // Création de la balise p
        let newPDelete = document.createElement("p");
        newPDelete.setAttribute("class", "deleteItem");
        newPDelete.innerText = "supprimer";
        newDivContentSettingsDelete.appendChild(newPDelete);

        // pour totaliser produits et prix dans le panier
        totaux();
      }
      // pour supprimer un produit
      deleteProduct();
      //  pour modifier la quantité
      changeQuantity();
    });

  // bouton commander
  buttonOrder.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      listProductInLocalStorage === null ||
      listProductInLocalStorage.length === 0
    ) {
      alert("votre panier est vide");
    } else {
      // FORMULAIRE/coordonnées
      // si la saisie est incorrecte
      console.log(errorFormulaireFirstName);
      console.log(errorFormulaireLastName);
      console.log(errorFormulaireAddress);
      console.log(errorFormulaireCity);
      console.log(errorFormulaireEmail);
      if (
        errorFormulaireFirstName == true ||
        errorFormulaireLastName == true ||
        errorFormulaireAddress == true ||
        errorFormulaireCity == true ||
        errorFormulaireEmail == true
      ) {
        alert("saisie incorrecte");
      } else {
        // Pour envoyer la quantité de produits par l'id, envoi au serveur sous forme de tableau
        let idProducts = [];
        let listProductInLocalStorage = JSON.parse(
          localStorage.getItem("product")
        );
        console.log(listProductInLocalStorage);
        for (let i = 0; i < listProductInLocalStorage.length; i++) {
          idProducts.push(listProductInLocalStorage[i].idProduct);
        }
        console.log(idProducts);
        const order = {
          contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: myAddress.value,
            city: myCity.value,
            email: myEmail.value,
          },
          products: idProducts,
        };

        // Envoi des produits et formulaire avec la méthode POST
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.clear();
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
          })
          .catch((err) => {
            console.log(err);
            alert("informations pas en mesure d'être transmis au serveur");
          });
      }
    }
  });
}
