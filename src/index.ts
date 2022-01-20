// Index maneja los elementos del index.html
// No hace falta usar imports y demás porque ambos archivos de js están en el index.html
// Se hace igual que en JS, aparece nulo, porque este elemento puede o no existir en HTML
// el as y el <> se pone para asignar el tipo de dato correcto
const bAdd = document.querySelector('#bAdd') as HTMLButtonElement;
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const inputCost = <HTMLInputElement>document.querySelector('#cost');
const inputCurrency:HTMLInputElement =<HTMLInputElement> document.querySelector('#currency');

const expenses = new Expenses('€');
// la ? nos permite asegurar que el valor puede estar vacío o no, para que no devuelva null y se cargue la aplicación
bAdd!.addEventListener('click', e => {
    if (inputTitle!.value !== '' && inputCost!.value !== '' && !isNaN(parseFloat(inputCost!.value))){
        const title = inputTitle!.value;
        const cost= parseFloat(inputCost!.value);
        const currency:Currency = <Currency>inputCurrency!.value;

        expenses.add({title: title, cost:{number:cost, currency: currency}});
        render();
    } else {
        alert('Completa los datos correctamente')
    }
});

function render(){
    let html = '';
    // Llama a la clase expenses  y al método getItems
    // For each ejecuta la función indicada una vez por cada elemento del Array
    expenses.getItems().forEach( item => {
        // se desestrcutura
        const{ id, title, cost} = item;
        // Al hacer esta desestructuración se borra el .cost (antes estaba cost.currency y cost.number)
        const {number, currency} = cost;

        html += ` <div class="item">
                    <div><span class="currency">${currency}</span>${number}</div>
                    <div>${title}</div>
                    <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
                    </div>`;

    })

    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();

    $$('.bEliminar').forEach(bEliminar => {
        bEliminar.addEventListener('click', e => {
            const id = (e.target as HTMLButtonElement ).getAttribute('data-id');
            expenses.remove(parseInt(id!))

            render();
        })
    })
}
//Esta función regresa un HTML element
function $(selector:string):HTMLElement{
    return document.querySelector(selector) as HTMLElement
}
function $$(selector:string): NodeListOf<HTMLElement>{
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>
}