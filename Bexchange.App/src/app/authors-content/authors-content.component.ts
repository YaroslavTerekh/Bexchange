import { BookService } from './../book.service';
import { AllDataService } from './../all-data.service';
import { Component, OnInit } from '@angular/core';
import { Author } from '../models/Author';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-authors-content',
  templateUrl: './authors-content.component.html',
  styleUrls: ['./authors-content.component.scss']
})
export class AuthorsContentComponent implements OnInit {

  authors: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private bookService: BookService
    ) { }

  ngOnInit(): void {
    this.bookService.getAllAuthors()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.authors = res;
        }, 
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      });
  }

}
