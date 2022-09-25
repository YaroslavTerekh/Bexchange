import { Router } from '@angular/router';
import { Book } from './../models/Book';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-content-functions',
  templateUrl: './book-content-functions.component.html',
  styleUrls: ['./book-content-functions.component.scss']
})
export class BookContentFunctionsComponent implements OnInit {
  @Input()book!: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
