import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/Book';

@Component({
  selector: 'app-book-content-owner-functions',
  templateUrl: './book-content-owner-functions.component.html',
  styleUrls: ['./book-content-owner-functions.component.scss']
})
export class BookContentOwnerFunctionsComponent implements OnInit {
  @Input()book!: Book;
  
  constructor() { }

  ngOnInit(): void {
  }

}
