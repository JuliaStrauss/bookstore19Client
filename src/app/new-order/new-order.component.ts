import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication-service";
import {Order} from "../shared/order";
import {OrderFactory} from "../shared/order-factory";

@Component({
    selector: 'bs-new-order',
    templateUrl: './new-order.component.html',
    styles: []
})
export class NewOrderComponent implements OnInit {

    books: Book[];
    booksinshoppingcart = [];
    booksincart = [];
    steuer = 0.2;

    @Input() order: Order;

    constructor(
        private bs : BookStoreService,
        private route: ActivatedRoute,
        private router: Router,
        private authService : AuthService) { }

    ngOnInit() {
        let book = JSON.parse(localStorage.getItem('items'));

        book.forEach(bookOrder => {
            this.bs.getSingle(bookOrder.isbn).subscribe(result => {
                this.booksinshoppingcart.push(result);

            });
            console.log(this.booksinshoppingcart);

        });
    }

    getAddress() {
        return this.authService.getAddress();
    }

    getBruttoAmount(){
        let mwst = this.getNettoAmount()*this.steuer;
        return this.getNettoAmount()+mwst;
    }

    getNettoAmount(){
        this.booksincart = JSON.parse(localStorage.getItem('items'));
        let totalAmount = 0;
        for (let i in this.booksincart){
            totalAmount = totalAmount + (this.booksincart[i].netAmount*this.booksincart[i].amount);
        }
        return totalAmount;
    }

    getAmount(isbn){
        this.booksincart = JSON.parse(localStorage.getItem('items'));

        for(let i in this.booksincart){
            if(this.booksincart[i].isbn == isbn){
                return this.booksincart[i].amount;
            }
        }
    }

    newOrder(){
        const new_order: Order = OrderFactory.empty();

        new_order.netAmount = this.getNettoAmount();
        new_order.state = 0;
        new_order.books = this.booksinshoppingcart;
        new_order.user_id = this.authService.getCurrentUserId();

        console.log(new_order);


        this.bs.createOrder(new_order).subscribe(res => {
            this.order = OrderFactory.empty();
            this.router.navigate(['../order'], {relativeTo: this.route});
            localStorage.removeItem('items');
        });

        console.log("Bestellung erfolgreich abgeschickt")
    }


}
