
export class Orderlog {

    constructor(
        public id : number,
        public adminComment : string,
        public comment : string,
        public state : number,
        public username : string,
        public order_id : number
    ){}

}
