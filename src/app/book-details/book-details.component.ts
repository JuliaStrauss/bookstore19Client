import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Book} from '../shared/book';
import {ActivatedRoute, Router} from "@angular/router";
import { BookStoreService } from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {User} from "../shared/user";
import {Image} from "../shared/image";
import {Author} from "../shared/author";

@Component({
    selector: 'bs-book-details',
    templateUrl: './book-details.component.html',
    styles: []
})
export class BookDetailsComponent implements OnInit {



    @Input() book: Book;
    @Input() user: User;

    constructor(
        private bs: BookStoreService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        const params = this.route.snapshot.params; //Zerlegt Route (URL) in alle Bestandteile und erstelle ass. Array
        this.bs.getSingle(params['isbn']).subscribe(
            b => this.book = b
        );
    }

    //Hilfsklasse die später Sterne ausgeben kann
    getRating(num: number) {
        return new Array(num);
    }

    isInCart(book){
        let LSItems;
        LSItems = localStorage.getItem('items');
        console.log(LSItems);

        console.log(book.isbn);

        for(let a in LSItems){
            console.log(LSItems[a]);
            if (LSItems[a].isbn == book.isbn){
                console.log("test1");
                return true;
            }
            return false;
        }
    }

    addBookToCart() {
        //Array in das Bücher gespeichert werden, die bereits im LS sind
        let BooksArray = [];
        //Neues Buch wird angelegt, dass in den LS gespeichert wird
        let BookInCart = {
            amount: 1,
            isbn: "",
            title: "",
            subtitle: "",
            images: [],
            authors: [],
            netAmount: 0
        };

        if (localStorage.getItem('items')) { //Wenn der LS bereits Items enthält
            BooksArray = JSON.parse(localStorage.getItem('items')); //Array wird mit bestehenden items befüllt
            let BookIsInCart = false;

            for(let i in BooksArray){ //Für jedes Item im Array
                if(BooksArray[i].isbn == this.book.isbn){ //Prüfung ob Buch bereits im Array ist
                    BooksArray[i].amount++; //Menge wird erhöht
                    BooksArray[i].netAmount = BooksArray[i].amount * this.book.netAmount; //Gesamtpreis wird errechnet
                    localStorage.setItem('items', JSON.stringify(BooksArray)); //Array wird in den LS geladen
                    BookIsInCart = true;
                }
            }

            if(!BookIsInCart){ //Wenn das Buch nicht gefunden wurde
                BookInCart.isbn = this.book.isbn;
                BookInCart.images = this.book.images;
                BookInCart.authors = this.book.authors;
                BookInCart.title =  this.book.title;
                BookInCart.subtitle = this.book.subtitle;
                BookInCart.netAmount = this.book.netAmount ;
                BooksArray.push(BookInCart);
                localStorage.setItem('items', JSON.stringify(BooksArray));
            }
        }

        else{
            BookInCart.title =  this.book.title;
            BookInCart.subtitle = this.book.subtitle;
            BookInCart.images = this.book.images;
            BookInCart.authors = this.book.authors;
            BookInCart.isbn = this.book.isbn;
            BookInCart.netAmount = this.book.netAmount ;
            BooksArray.push(BookInCart);
            localStorage.setItem('items', JSON.stringify(BooksArray));
        }
    }
}


