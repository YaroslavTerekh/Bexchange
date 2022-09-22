import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(dataSvc: AllDataService, private router: Router) { 
    dataSvc.books.subscribe({
      next: (res: Book[]) => {
        this.books = res;         
      },
      error: (err: any) => {
        this.router.navigate(['/error', { error: JSON.stringify(err) }])
      }
    });
  }
  
  ngOnInit(): void {
    
  }

}
