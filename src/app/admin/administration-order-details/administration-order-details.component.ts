import {Component, Input, OnInit} from '@angular/core';
import {BookStoreService} from "../../shared/book-store.service";
import {AuthService} from "../../shared/authentication-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order, User} from "../../shared/order";
import {Book} from "../../shared/book";

@Component({
    selector: 'bs-administration-order-details',
    templateUrl: './administration-order-details.component.html',
    styles: []
})
export class AdministrationOrderDetailsComponent implements OnInit {

    @Input() order: Order;
    @Input() book: Book;
    @Input() user: User;

    books = [];
    newState = 0;


    constructor(private bs: BookStoreService,
                private route : ActivatedRoute,
                private router: Router,
                private authService: AuthService) { }

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.bs.getSingleOrder(params['id']).subscribe(
            b =>this.order = b
        );

        this.bs.getAll().subscribe(res => this.books = res);

    }

    getBruttoAmount(){
        return this.order.netAmount;
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

    changeState(value) {
        switch (value) {
            case "Offen":
                this.newState = 0;
                break;
            case "Bezahlt":
                this.newState = 1;
                break;
            case "Versendet":
                this.newState = 2;
                break;
            case "Storniert":
                this.newState = 3;
                break;
        }

        console.log("state=" + this.newState);

    }

    saveState(c_order){
        console.log(this.newState);
        c_order.state = this.newState;
        console.log(c_order);


        this.bs.updateState(c_order).subscribe(res => {
            this.router.navigate(['../orders'], { relativeTo: this.route });
        });
    }

    getUserFirstname(){
        return this.authService.getUserFirstName()
    }

    getUserLastname(){
        return this.authService.getUserLastName()
    }

    getUserAddress(){
        return this.authService.getAddress()
    }

}
