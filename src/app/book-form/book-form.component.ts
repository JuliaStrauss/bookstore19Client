import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';

import {BookFormErrorMessages} from './book-form-error-messages';
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {Book, Image} from "../shared/book";

@Component({
    selector: 'bs-book-form',
    templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
    bookForm: FormGroup; //Das Formular ist vom Typ FormGroup
    book = BookFactory.empty(); //erzeugt leeres Buch-Objekt
    errors: { [key: string]: string } = {}; //Error-Array (key-value-Pairs: Fehlerhaftes Feld - Fehlermeldung)
    isUpdatingBook = false; //Wird neues Buch angelegt oder wird bestehendes Buch bearbeitet? Inital = false
    images: FormArray; //Subfomular für Bilder

    constructor(private fb: FormBuilder, private bs: BookStoreService,
                private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        //Ist ISBN-Nr in der Route
        // - Wenn ja: Formular wird mit bestehenden Daten des Buches befüllt
        // - Wenn nein: Formular bleibt leer
        const isbn = this.route.snapshot.params['isbn'];
        if (isbn) {
            this.isUpdatingBook = true;
            this.bs.getSingle(isbn).subscribe(book => {
                this.book = book;
                this.initBook();
            });
        }
        this.initBook();
    }

    //Objekt wird erstellt, entweder es ist leer oder es wird mit den bestehenden Daten des aktuellen Buches befüllt
    //Objekt (egal ob leer oder befüllt) wird an Formular gebunden
    initBook() {
        this.buildThumbnailsArray(); //Subformular wird aufgerufen

        this.bookForm = this.fb.group({
            //Werte werden dem Formular zugewiesen
            id: this.book.id, //Das Feld ID wird mit der ID des aktuellen Buches befpllt
            title: [this.book.title, Validators.required], //title muss! befüllt werden
            subtitle: this.book.subtitle,
            isbn: [this.book.isbn, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(13)
            ]],
            description: this.book.description,
            rating: [this.book.rating, [
                Validators.min(0),
                Validators.max(10)
            ]],
            //authors: this.authors,
            images: this.images,
            published: new Date(this.book.published)
        });
        //Hilfsklasse wird aufgerufen
        this.bookForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }

    //wenn aktuelles Buch Bilder hat,
    //baut es daraus ein Subfomular zusammen und gibt es im Hauptfomular aus
    buildThumbnailsArray() {
        console.log(this.book.images);
        if (this.book.images.length == 0) { //if new book had no images -> but no in edit mode
            this.book.images.push(new Image(0, '', ''))
        }
        this.images = this.fb.array(
            this.book.images.map(
                t => this.fb.group({
                    id: this.fb.control(t.id),
                    url: this.fb.control(t.url),
                    title: this.fb.control(t.title)
                })
            )
        );
        console.log(this.images);
    }

    //Neues Bild kann hinzugefügt werden
    addThumbnailControl() {
        this.images.push(this.fb.group({url: null, title: null}));
    }

    submitForm() {
        // filter empty values
        this.bookForm.value.images = this.bookForm.value.images.filter(thumbnail => thumbnail.url);

        //Aus einzelnen Werten des Formulars wird wieder ein Objekt generiert
        const book: Book = BookFactory.fromObject(this.bookForm.value);

        //deep copy  - did not work without?? //ist halt so, checkt er anders nicht
        book.images = this.bookForm.value.images;
        console.log(book);

        //just copy the authors
        book.authors = this.book.authors;

        //Entweder das Buch wird upgedated
        //Wenn Buch aktualisiert, dann wird zurück auf Übersicht gegangen
        if (this.isUpdatingBook) {
            this.bs.update(book).subscribe(res => {
                this.router.navigate(['../../books', book.isbn], {relativeTo: this.route});
            });
            //Oder es wird ein neues Buch angelegt
            //dazu brauchen wir eine User-ID
        } else {
            //Jetzt noch hardcodiert, weil kein Benutzer angemeldet
            book.user_id = 1;// jsut for testing
            console.log(book)
            //Buch wird angelgt
            this.bs.create(book).subscribe(res => {
                this.book = BookFactory.empty();
                this.bookForm.reset(BookFactory.empty());
                //zurück zur Übersicht
                this.router.navigate(['../books'], {relativeTo: this.route});
            });
        }
    }

    //Hat ein Validator gefeuert (Also enthält der Text Fehler)? Wenn ja, bringt Fehlermeldung.
    updateErrorMessages() {
        this.errors = {};
        for (const message of BookFormErrorMessages) {
            const control = this.bookForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}
