import { Component, Input, OnInit } from '@angular/core';
import { AllDataService, Book } from '../all-data.service';

@Component({
  selector: 'app-library-content',
  templateUrl: './library-content.component.html',
  styleUrls: ['./library-content.component.scss']
})
export class LibraryContentComponent implements OnInit {
  bookEmit!: Array<Book>;
  bookList!: Book[];
  books!: any;

  constructor(dataSvc: AllDataService) { 
    setTimeout(() => {
      this.books = dataSvc.books;
    }, 1000)
  }

  ngOnInit(): void {
    
  }

}
