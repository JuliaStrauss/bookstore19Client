import { Component, OnInit, Input } from '@angular/core';
import {Book} from '../shared/book';

@Component({
  selector: 'a.bs-home-book-list',
  templateUrl: './home-book-list.component.html',
  styles: []
})
export class HomeBookListComponent implements OnInit {

    @Input() book: Book;

  constructor() { }

  ngOnInit() {
  }
}
