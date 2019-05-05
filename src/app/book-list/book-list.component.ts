import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Book, Image, Author } from '../shared/book';
import { BookStoreService} from "../shared/book-store.service";

@Component({
    selector: 'bs-book-list',
    templateUrl: './book-list.component.html',
    styles: []
})
export class BookListComponent implements OnInit {

    //Array in das Bücher gespeichert werden
    books : Book[];

    //Event wird ausgegeben wenn Element geklickt wird
    @Output() showDetailsEvent = new EventEmitter<Book>(); //Event definieren

    //Immer wenn BookStoreService angelegt wird, wird hier automatisch ein neuer BookStoreService angelegt
    constructor(private bs: BookStoreService) {
    }

    ngOnInit() { //Wenn Component im index.html geladen wird
        this.bs.getAll().subscribe(res => this.books = res); //ist jetzt Observer oder Observibal
    }
}

