import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";
import {ActivatedRoute, Router} from "@angular/router";
import { Big } from 'big.js';

@Component({
    selector: 'a.bs-shopping-cart-item',
    templateUrl: './shopping-cart-item.component.html',
    styles: []
})
export class ShoppingCartItemComponent implements OnInit {

    @Input() book: Book;
    booksinshoppingcart = [];
    steuer = 0.2;

    constructor(private bs : BookStoreService,
                private route: ActivatedRoute,
                private router: Router,
                private authService : AuthService) {

    }

    ngOnInit() {

    }

    removeBook(){
        localStorage.removeItem('item');
    }

    getAmount(book){
        this.booksinshoppingcart = JSON.parse(localStorage.getItem('items'));
        for (let i in this.booksinshoppingcart){
            if(this.booksinshoppingcart[i].isbn == book.isbn){
                return this.booksinshoppingcart[i].amount;
            }
        }
    }

    getBruttoAmount(book){
        this.booksinshoppingcart = JSON.parse(localStorage.getItem('items'));
        for (let i in this.booksinshoppingcart){
            if(this.booksinshoppingcart[i].isbn == book.isbn){
                let netto =  Number.parseFloat(this.booksinshoppingcart[i].netAmount);
                let mwst = netto * this.steuer;
                let brutto = netto + mwst;
                let rounded = brutto.toFixed(2);
                return rounded;
            }
        }
    }
}
