
interface ExpenseItem{
    id?: number,
    title: string,
    cost: Price
}

type Currency = 'USD' | '€';

interface Price{
    number:number,
    currency:Currency
}

interface IExpenses{
    expenses:ArrayList<ExpenseItem>,
    finalCurrency: Currency,
    add(item:ExpenseItem):boolean,
    get(index:number):ExpenseItem|null,
    getTotal():string,
    remove(id:number):boolean
}



class Expenses implements IExpenses {
    expenses: ArrayList<ExpenseItem>;
    finalCurrency: Currency;

    private count = 0;

    constructor(currency:Currency){
        this.finalCurrency = currency;
        this.expenses = new ArrayList<ExpenseItem>();
    }
    add(item: ExpenseItem): boolean {
        item.id = this.count;
        this.count++;
        this.expenses.add(item)
        return true;
    }
    get(index:number): ExpenseItem | null {
        return this.expenses.get(index);
    }
    // Puedes poner un método que no este en la interfaz, sólo le corresponde a esta clase
    getItems():ExpenseItem[]{
        return this.expenses.getAll();
    }
    getTotal(): string {
        // Se obtienen todos los elementos (reduce porque getItems devuelve un Array.acc =el acumulador)
        // retorna el acumulador ++ convirtiendo a € O USD en cada caso el item
        const total = this.getItems().reduce((acc, item) => {
            return acc+=this.convertCurrency(item, this.finalCurrency);
        }, 0);

        return `${this.finalCurrency} ${total.toFixed(2).toString()}`;
    }
    remove(id: number): boolean {
        // Filtramos para ver si el id del item es distinto del id y nos trae todos los elementos que no son el que queremos eliminar
        const items:ExpenseItem[] = this.getItems().filter(item =>{
            return item.id != id
        });

       // Para que lo cree a partir de items
       this.expenses.createFrom(items);
        return true;
    }
// privada para que no se pueda acceder fuera de la clase
    private convertCurrency(item:ExpenseItem, currency:Currency):number{
        switch(item.cost.currency){
            // Se multiplican los dólares que estoy recibiendo en item * 1.0831 (Que es lo que vale 1 dolar en €)
            case '€':
                switch(currency){
                    case 'USD':
                        return item.cost.number * 1.0831;
                        // TS sabe que nunca se alcanzará este break
                        break;
                    // Si no entra en el caso de USD, sabe que tiene que devolver el mismo valor
                    default:
                        return item.cost.number
                }
                break;
                // Es lo mismo que el caso anterior, sólo que al revés. Conviertiendo USD en €
            case 'USD':
                switch(currency){
                    case '€':
                        return item.cost.number / 1.0831;
                        break;
                    default:
                        return item.cost.number
                }
            // Este default sirve por si acaso se ingresa otro valor que no es, ya que converCurrency está especificando que solo regrese números
            default:
                return 0;
        }
    }

}
// Es un genérico porque tiene la <T>
class ArrayList<T>{
    private items:T[];

    constructor(){
        this.items = [];
    }

    add(item:T):void{
        this.items.push(item)
    }

    get(index:number):T|null{
        const item:T[] = this.items.filter((x:T, i:number) => {
            return i === index;
        })

        if(item.length === 0){
            return null
        }else{
            return item[0]
        }

    }

    createFrom(value:T[]):void{
        this.items = [...value]
    }

    getAll():T[]{
        return this.items
    }
}