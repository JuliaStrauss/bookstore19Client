import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Book} from '../shared/book';
import {ActivatedRoute, Router} from "@angular/router";
import { BookStoreService } from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";

@Component({
    selector: 'bs-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styles: []
})
export class ShoppingCartComponent implements OnInit {

    @Input() book: Book;

    books = [];
    booksInShoppingCart = [];
    steuer = 0.2;

    constructor( private bs: BookStoreService,
                 private route : ActivatedRoute,
                 private router: Router,
                 private authService: AuthService) {
    }



    ngOnInit() {

        /*let shoppingCart = JSON.parse(localStorage.getItem('array'));
        console.log(shoppingCart)

        if (shoppingCart){
            for (let i=0; i < shoppingCart.length; i++){
                this.books[i] = shoppingCart[i];
                console.log(this.books);
            }
        }*/



        let items = JSON.parse(localStorage.getItem('items'));
        if (items){
            for (let i=0; i < items.length; i++){
                this.books[i] = items[i];
                console.log(this.books);
            }
        }
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    isLoggedOut() {
        return this.authService.isLoggedOut();
    }

    deleteCart(){
        localStorage.removeItem('items');
    }

    getTotalAmount(){
        let totalAmount = 0;
        this.booksInShoppingCart = JSON.parse(localStorage.getItem('items'));
        for(let i in this.booksInShoppingCart){
            totalAmount = totalAmount + (this.booksInShoppingCart[i].netAmount * this.getAmount(this.booksInShoppingCart[i].isbn));
        }
        console.log(totalAmount);
        let netto = totalAmount;
        console.log(netto);
        let mwst = netto * this.steuer;
        console.log(mwst);
        let brutto = netto + mwst;
        console.log(brutto);
        let rounded = brutto.toFixed(2);
        return rounded;
    }

    getAmount(isbn) {
        this.booksInShoppingCart = JSON.parse(localStorage.getItem('items'));
        for (let i in this.booksInShoppingCart) {
            if (this.booksInShoppingCart[i].isbn == isbn) {
                return this.booksInShoppingCart[i].amount;
            }
        }
    }



}
