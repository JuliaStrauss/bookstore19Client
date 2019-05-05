import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Book} from "../shared/book";
import {Order} from "../shared/order";
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";

@Component({
    selector: 'bs-order-list',
    templateUrl: './order-list.component.html',
    styles: []
})
export class OrderListComponent implements OnInit {

    orders : Order[];
    books: Book[];

    @Output() showDetailsEvent = new EventEmitter<Order>();


    constructor(
        private bs: BookStoreService,
        private AuthService: AuthService) { }

    ngOnInit() {
        this.bs.getAllOrders().subscribe(res => this.orders = res);
        this.bs.getAll().subscribe(res => this.books = res);

        let user_id;

        if(this.AuthService.isLoggedIn()){
            user_id = this.AuthService.getCurrentUserId();
        }
        console.log(user_id);
    }
}

