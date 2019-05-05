import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookStoreService} from "../../shared/book-store.service";
import {Order} from "../../shared/order";
import {AuthService} from "../../shared/authentication-service";
import {Book} from "../../shared/book";

@Component({
  selector: 'a.bs-administration-order-list',
  templateUrl: './administration-order-list.component.html',
  styles: []
})
export class AdministrationOrderListComponent implements OnInit {

    @Input() order: Order;
    orders : Order[];
    books: Book[];

    @Output() showDetailsEvent = new EventEmitter<Order>();


    constructor(
        private bs: BookStoreService,
        private AuthService: AuthService) { }

    ngOnInit() {
        this.bs.getAllOrders().subscribe(res => this.orders = res);
        this.bs.getAll().subscribe(res => this.books = res);
    }


}
