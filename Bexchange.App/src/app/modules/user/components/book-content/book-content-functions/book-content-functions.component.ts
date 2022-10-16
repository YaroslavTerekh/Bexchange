import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Book } from "src/app/shared/models/Book";

@Component({
  selector: 'app-book-content-functions',
  templateUrl: './book-content-functions.component.html',
  styleUrls: ['./book-content-functions.component.scss']
})
export class BookContentFunctionsComponent implements OnInit {
  @Input()book!: Book;
  @Output()comments = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
