import { Book } from 'src/app/shared/models/Book';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthorizationService } from "src/app/core/services/authorization.service";
import { BookService } from "src/app/core/services/book.service";
import { StateDictionary } from "../../models/StateDictionary";

@UntilDestroy()
@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnInit {
  stateDict: StateDictionary = new StateDictionary();
  book!: Book;
  bookImg!: string | ArrayBuffer | null;
  isOwner!: boolean;
  openComments!: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
    private readonly authorizationService: AuthorizationService,
    ) {
  }

  ngOnInit(): void {
    this.bookService.getBook(this.route.snapshot.params['id'])
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {       
          this.bookService.getImage(res.image?.id)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: res => {
                this.createImageFromBlob(res);
              }
            });

          this.book = res; 

          if(this.book.userId == this.authorizationService.getUserId()) {
            this.isOwner = true;
          } else {
            this.isOwner = false;
          }

        }
      })
  }

  createImageFromBlob(image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.bookImg = reader.result;      
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
