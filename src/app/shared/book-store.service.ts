import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {Author, Book, Image} from "./book";
import {Order} from "./order";

@Injectable()
export class BookStoreService {

    private api = 'http://bookstore19.s1610456034.student.kwmhgb.at/api';


    constructor(private http: HttpClient) {}

    //BOOKS
    getAll() : Observable<Array<Book>> {
        return this.http.get(`${this.api}/books`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSingle(isbn:string) : Observable<Book>{
        return this.http.get(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    // Bücher erstellen
    create (book : Book): Observable<any>{
        return this.http.post(`${this.api}/book`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    //Bücher ändern
    update (book : Book): Observable<any>{
        return this.http.put(`${this.api}/book/${book.isbn}`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    //Bücher löschen
    remove (isbn:string): Observable<any>{
        return this.http.delete(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    //ORDERS
    getAllOrders() : Observable<Array<Order>> {
        return this.http.get(`${this.api}/order`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getSingleOrder(id: number) : Observable<Order>{
        return this.http.get(`${this.api}/order/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    createOrder (order : Order): Observable<any>{
        return this.http.post(`${this.api}/order`, order)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    updateState (order : Order) : Observable<any> {
        return this.http.put(`${this.api}/order/${order.id}`, order)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    private errorHandler ( error:Error | any) : Observable<any> {
        return throwError(error);
    }
}
