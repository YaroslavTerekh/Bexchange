import { Router } from '@angular/router';
import { AllDataService } from './../all-data.service';
import { Component, OnInit } from '@angular/core';
import { MainBookComponent } from '../main-book/main-book.component';
import { Book } from '../models/Book';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  books!: Book[];

  slideConfig = { 
    slidesToShow: 5, 
    slidesToScroll: 5, 
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  constructor(
    private dataService: AllDataService,
    private router: Router
    ) {
   }

  ngOnInit(): void {
    this.dataService.getFirstBooks(10)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: res => {        
        this.books = res;
      },
      error: (err: any) => {
        this.router.navigate(['/error', { error: JSON.stringify(err) }]);
      }
    });
  }

}
