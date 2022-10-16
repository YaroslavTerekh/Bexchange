import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Book } from "src/app/shared/models/Book";

@UntilDestroy()
@Component({
  selector: 'app-main-book',
  templateUrl: './main-book.component.html',
  styleUrls: ['./main-book.component.scss']
})
export class MainBookComponent implements OnInit, OnDestroy {
  @ViewChild("imgBlock", { static: false }) imgDIV: ElementRef | undefined;
  @ViewChild("descrBlock", { static: false }) descrDIV: ElementRef | undefined;

  public slideList!: Book[];
  public slideImg!: string | ArrayBuffer | null;
  public i: number = 0;
  public description: string | undefined;
  public title!: string | undefined;
  interval!: number;
  timeout!: number;

  constructor(
    private readonly bookService: BookService
  ) {

  }

  ngOnInit(): void {
    this.bookService.getFirstBooks(10)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          if (res.length > 0) {
            
            
            this.slideList = res;
            this.bookService.getImage(this.slideList[this.i]?.image?.id)
              .pipe(untilDestroyed(this))
              .subscribe(res => {
                this.createImageFromBlob(res);
              });
            this.description = this.slideList[this.i]?.description;
            this.title = this.slideList[this.i]?.title;

            this.interval = setInterval(() => {
              if(res.length <= 1) {
                clearInterval(this.interval);
                clearTimeout(this.timeout);
                return;
              }

              this.imgDIV?.nativeElement.classList.add('hide');
              this.descrDIV?.nativeElement.classList.add('hide');

              this.timeout = setTimeout(() => {
                this.i++;
                if (this.slideList.length == this.i) this.i = 0;

                this.bookService.getImage(this.slideList[this.i]?.image?.id)
                  .pipe(untilDestroyed(this))
                  .subscribe(res => {
                    this.createImageFromBlob(res);
                    this.description = this.slideList[this.i]?.description;
                    this.title = this.slideList[this.i]?.title;
                    this.imgDIV?.nativeElement.classList.remove('hide');
                    this.descrDIV?.nativeElement.classList.remove('hide');
                  }, err => {
                    clearInterval(this.interval);
                    clearTimeout(this.timeout);
                  });
              }, 400);

            }, 15000)
          }
        }
      });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.slideImg = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }
}
