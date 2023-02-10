const orderId = getOrderId();
displayOrderId(orderId);

removeItem();

function getOrderId() {
  const orderId = new URLSearchParams(window.location.search).get("orderId");

  return orderId;
}
// Affichage du numéro de commande
function displayOrderId(orderId) {
  const orderIdElement = document.getElementById("orderId");
  orderIdElement.textContent = orderId;
}
// Pour retirer le numéro de commande dans le localStorage
function removeItem() {
  const cache = window.localStorage;

  cache.clear();
}
console.log(orderId);
