import { BookService } from './../book.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AllDataService } from './../all-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Genre } from '../models/Genre';
import { environment } from 'src/environments/environment.prod';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-genres-content',
  templateUrl: './genres-content.component.html',
  styleUrls: ['./genres-content.component.scss']
})
export class GenresContentComponent implements OnInit {  
  genres: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private bookService: BookService
    ) { }

  ngOnInit(): void {
    this.bookService.getAllGenres()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.genres = res;          
        }, 
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      });
  }

}
