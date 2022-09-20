import { Component, Input, OnInit } from '@angular/core';
import { AllDataService } from '../all-data.service';
import { Book } from '../models/Book';

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
    dataSvc.books.subscribe((res: Book[]) => {
      this.books = res;         
    });
  }

  ngOnInit(): void {
    
  }

}
