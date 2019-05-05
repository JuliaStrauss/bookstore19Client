import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookStoreService} from "../shared/book-store.service";
import {Book, Image} from "../shared/book";
import {AuthService} from "../shared/authentication-service";
import {Order, User} from "../shared/order";


@Component({
    selector: 'bs-order-details',
    templateUrl: './order-details.component.html',
    styles: []
})
export class OrderDetailsComponent implements OnInit {

    @Input() order: Order;
    @Input() book: Book;
    @Input() user: User;

    books = [];
    booksinshoppingcart = [];
    steuer = 0.2;

    constructor(private bs: BookStoreService,
                private route : ActivatedRoute,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.bs.getSingleOrder(params['id']).subscribe(
            b =>this.order = b
        );

        this.bs.getAll().subscribe(res => this.books = res);
        let user_id;

        if(this.authService.isLoggedIn()){
            user_id = this.authService.getCurrentUserId();
        }

        console.log(user_id);
    }

    getState(stateNumber) {
        switch (stateNumber) {
            case 0:
                return "offen";
            case 1:
                return "bezahlt";
            case 2:
                return "versendet";
            case 3:
                return "storniert";
        }
    }
}
