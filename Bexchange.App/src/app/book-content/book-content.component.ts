import { AuthorizationService } from './../authorization.service';
import { BookService } from './../book.service';
import { AllDataService } from './../all-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnInit {
  book!: any;
  isOwner!: boolean;
  openComments!: boolean;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router,
    private bookService: BookService,
    private authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
    this.bookService.getBook(this.route.snapshot.params['id'])
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.book = res; 
          
          if(this.book.userId == this.authorizationService.getUserId()) {
            this.isOwner = true;
          } else {
            this.isOwner = false;
          }
        },
        error: err => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      })
  }

}
