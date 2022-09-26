import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/Book';

@Component({
  selector: 'app-book-content-owner-functions',
  templateUrl: './book-content-owner-functions.component.html',
  styleUrls: ['./book-content-owner-functions.component.scss']
})
export class BookContentOwnerFunctionsComponent implements OnInit {
  @Input()book!: Book;
  @Output()comments = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
