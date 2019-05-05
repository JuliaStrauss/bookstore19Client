import {Order} from "./order";
import {Orderlog} from "./orderlog";
import {Book} from "./book";
import {User} from "./user";

export class OrderFactory {

    static empty(): Order {
        return new Order(null, 0,[],[],0,2,[]);
    }


    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.netAmount,
            rawOrder.books,
            rawOrder.user_id,
            rawOrder.state,
            rawOrder.orderlog
        );
    }
}