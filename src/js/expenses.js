"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var Expenses = /** @class */ (function () {
  function Expenses(currency) {
    this.count = 0;
    this.finalCurrency = currency;
    this.expenses = new ArrayList();
  }
  Expenses.prototype.add = function (item) {
    item.id = this.count;
    this.count++;
    this.expenses.add(item);
    return true;
  };
  Expenses.prototype.get = function (index) {
    return this.expenses.get(index);
  };
  // Puedes poner un método que no este en la interfaz, sólo le corresponde a esta clase
  Expenses.prototype.getItems = function () {
    return this.expenses.getAll();
  };
  Expenses.prototype.getTotal = function () {
    var _this = this;
    // Se obtienen todos los elementos (reduce porque getItems devuelve un Array.acc =el acumulador)
    // retorna el acumulador ++ convirtiendo a € O USD en cada caso el item
    var total = this.getItems().reduce(function (acc, item) {
      return (acc += _this.convertCurrency(item, _this.finalCurrency));
    }, 0);
    return ""
      .concat(this.finalCurrency, " ")
      .concat(total.toFixed(2).toString());
  };
  Expenses.prototype.remove = function (id) {
    // Filtramos para ver si el id del item es distinto del id y nos trae todos los elementos que no son el que queremos eliminar
    var items = this.getItems().filter(function (item) {
      return item.id != id;
    });
    // Para que lo cree a partir de items
    this.expenses.createFrom(items);
    return true;
  };
  // privada para que no se pueda acceder fuera de la clase
  Expenses.prototype.convertCurrency = function (item, currency) {
    switch (item.cost.currency) {
      // Se multiplican los dólares que estoy recibiendo en item * 1.0831 (Que es lo que vale 1 dolar en €)
      case "€":
        switch (currency) {
          case "USD":
            return item.cost.number * 1.0831;
            // TS sabe que nunca se alcanzará este break
            break;
          // Si no entra en el caso de USD, sabe que tiene que devolver el mismo valor
          default:
            return item.cost.number;
        }
        break;
      // Es lo mismo que el caso anterior, sólo que al revés. Conviertiendo USD en €
      case "USD":
        switch (currency) {
          case "€":
            return item.cost.number / 1.0831;
            break;
          default:
            return item.cost.number;
        }
      // Este default sirve por si acaso se ingresa otro valor que no es, ya que converCurrency está especificando que solo regrese números
      default:
        return 0;
    }
  };
  return Expenses;
})();
// Es un genérico porque tiene la <T>
var ArrayList = /** @class */ (function () {
  function ArrayList() {
    this.items = [];
  }
  ArrayList.prototype.add = function (item) {
    this.items.push(item);
  };
  ArrayList.prototype.get = function (index) {
    var item = this.items.filter(function (x, i) {
      return i === index;
    });
    if (item.length === 0) {
      return null;
    } else {
      return item[0];
    }
  };
  ArrayList.prototype.createFrom = function (value) {
    this.items = __spreadArray([], value, true);
  };
  ArrayList.prototype.getAll = function () {
    return this.items;
  };
  return ArrayList;
})();
