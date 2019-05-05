import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Book, Image, Author } from '../shared/book';
import { BookStoreService} from "../shared/book-store.service";

@Component({
    selector: 'bs-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    books : Book[];
    @Input() book: Book;

    constructor(private bs: BookStoreService) {
    }

    ngOnInit() {
        this.bs.getAll().subscribe(res => this.books = res);
    }

}


