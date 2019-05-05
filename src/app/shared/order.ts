import {User} from "./user";
export {User} from "./user";

import{Book} from "./book";
export{Book} from "./book";

import {Orderlog} from "./orderlog";
export{Orderlog} from "./orderlog";

export class Order {

    constructor(
        public id: number,
        public netAmount: number,
        public books : Book[],
        public user : User[],
        public state: number,
        public user_id: number,
        public orderlog?: Orderlog[]
        )
    {}


}


