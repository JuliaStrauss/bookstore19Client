import {Book} from "./book";


export class Shoppingcart {
    constructor(
        public id: number,
        public price: number,
        public books: Book[],
    ){}
}
