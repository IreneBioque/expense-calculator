"use strict";
// Index maneja los elementos del index.html
// No hace falta usar imports y demás porque ambos archivos de js están en el index.html
// Se hace igual que en JS, aparece nulo, porque este elemento puede o no existir en HTML
// el as y el <> se pone para asignar el tipo de dato correcto
var bAdd = document.querySelector("#bAdd");
var inputTitle = document.querySelector("#title");
var inputCost = document.querySelector("#cost");
var inputCurrency = document.querySelector("#currency");
var expenses = new Expenses("€");
// la ? nos permite asegurar que el valor puede estar vacío o no, para que no devuelva null y se cargue la aplicación
bAdd.addEventListener("click", function (e) {
  if (
    inputTitle.value !== "" &&
    inputCost.value !== "" &&
    !isNaN(parseFloat(inputCost.value))
  ) {
    var title = inputTitle.value;
    var cost = parseFloat(inputCost.value);
    var currency = inputCurrency.value;
    expenses.add({ title: title, cost: { number: cost, currency: currency } });
    render();
  } else {
    alert("Completa los datos correctamente");
  }
});
function render() {
  var html = "";
  // Llama a la clase expenses  y al método getItems
  // For each ejecuta la función indicada una vez por cada elemento del Array
  expenses.getItems().forEach(function (item) {
    // se desestrcutura
    var id = item.id,
      title = item.title,
      cost = item.cost;
    // Al hacer esta desestructuración se borra el .cost (antes estaba cost.currency y cost.number)
    var number = cost.number,
      currency = cost.currency;
    html +=
      ' <div class="item">\n                    <div><span class="currency">'
        .concat(currency, "</span>")
        .concat(number, "</div>\n                    <div>")
        .concat(
          title,
          '</div>\n                    <div><button class="bEliminar" data-id="'
        )
        .concat(id, '">Eliminar</button></div>\n                    </div>');
  });
  $("#items").innerHTML = html;
  $("#display").textContent = expenses.getTotal();
  $$(".bEliminar").forEach(function (bEliminar) {
    bEliminar.addEventListener("click", function (e) {
      var id = e.target.getAttribute("data-id");
      expenses.remove(parseInt(id));
      render();
    });
  });
}
//Esta función regresa un HTML element
function $(selector) {
  return document.querySelector(selector);
}
function $$(selector) {
  return document.querySelectorAll(selector);
}
