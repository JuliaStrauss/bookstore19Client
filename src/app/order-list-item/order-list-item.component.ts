import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {Order} from "../shared/order";
import {AuthService} from "../shared/authentication-service";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'a.bs-order-list-item',
    templateUrl: './order-list-item.component.html',
    styles: []
})
export class OrderListItemComponent implements OnInit {

    @Input() order: Order;
    @Input() books: Book;

    constructor(
        private bs: BookStoreService,
        private route : ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {

    }

    getUserId(){
        return this.authService.getCurrentUserId();
    }

}
