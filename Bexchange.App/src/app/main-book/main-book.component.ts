import { DomSanitizer } from '@angular/platform-browser';
import { BookService } from './../book.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Book } from '../models/Book';

@UntilDestroy()
@Component({
  selector: 'app-main-book',
  templateUrl: './main-book.component.html',
  styleUrls: ['./main-book.component.scss']
})
export class MainBookComponent implements OnInit, AfterViewInit {
  @ViewChild("imgBlock", { static: false }) imgDIV: ElementRef | undefined;
  @ViewChild("descrBlock", { static: false }) descrDIV: ElementRef | undefined;

  public slideList!: Book[];
  public slideImg: any;
  public i: number = 0;
  public description: string | undefined;
  public title!: string | undefined;

  constructor(
    private bookService: BookService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void {
    this.bookService.getFirstBooks(10)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.slideList = res;
          this.bookService.getImage(this.slideList[this.i]?.image?.id)
            .pipe(untilDestroyed(this))
            .subscribe(res => {
              this.slideImg = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + res.base64ImageRepresentation);
            });
          this.description = this.slideList[this.i]?.description;
          this.title = this.slideList[this.i]?.title;          
          setInterval(() => {
            this.imgDIV?.nativeElement.classList.add('hide');
            this.descrDIV?.nativeElement.classList.add('hide');
            setTimeout(() => {
              this.i++;
              if (this.slideList.length == this.i) this.i = 0;

              this.bookService.getImage(this.slideList[this.i]?.image?.id)
                .pipe(untilDestroyed(this))
                .subscribe(res => {
                  this.slideImg = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + res.base64ImageRepresentation);
                });

              this.description = this.slideList[this.i]?.description;
              this.title = this.slideList[this.i]?.title;
              this.imgDIV?.nativeElement.classList.remove('hide');
              this.descrDIV?.nativeElement.classList.remove('hide');
            }, 400);
          }, 10000)
        },
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }]);
        }
      });
  }

  ngAfterViewInit(): void {


  }
}
