import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../all-data.service';

@Component({
  selector: 'app-library-content-book',
  templateUrl: './library-content-book.component.html',
  styleUrls: ['./library-content-book.component.scss']
})
export class LibraryContentBookComponent implements OnInit {

  @Input() book!: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
