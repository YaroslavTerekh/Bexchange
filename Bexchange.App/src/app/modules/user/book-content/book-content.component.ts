import { StateDictionary } from 'src/app/models/StateDictionary';
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthorizationService } from "src/app/services/authorization.service";
import { BookService } from "src/app/services/book.service";


@UntilDestroy()
@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnInit {
  stateDict: StateDictionary = new StateDictionary();
  book!: any;
  bookImg: any;
  isOwner!: boolean;
  openComments!: boolean;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router,
    private bookService: BookService,
    private authorizationService: AuthorizationService,
    private sanitizer: DomSanitizer
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.bookImg = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
