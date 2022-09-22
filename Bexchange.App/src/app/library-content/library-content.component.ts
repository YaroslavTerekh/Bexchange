import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AllDataService } from '../all-data.service';
import { Book } from '../models/Book';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-library-content',
  templateUrl: './library-content.component.html',
  styleUrls: ['./library-content.component.scss']
})
export class LibraryContentComponent implements OnInit {
  bookEmit!: Array<Book>;
  bookList!: Book[];
  books!: any;

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }
  
  ngOnInit(): void {
    this.http.get(`${environment.bexchangeApi}Book/`)
      .subscribe({
        next: res => {
          this.books = res;
        }, 
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      });
  }

}
