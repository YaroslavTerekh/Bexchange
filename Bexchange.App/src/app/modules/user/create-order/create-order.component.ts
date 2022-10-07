import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/services/book.service";
import { Order } from "src/app/models/Order";
import { AuthorizationService } from "src/app/services/authorization.service";
import { OrderService } from "src/app/services/order.service";


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})

@UntilDestroy()
export class CreateOrderComponent implements OnInit {
  books: any[] = [];
  book!: any;
  activeBookIndex!: number;
  activeBookId!: number;
  bookImg: any;

  constructor(
    private orderService: OrderService,
    private bookService: BookService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.bookService.getBook(this.route.snapshot.params['id'])
    .pipe(untilDestroyed(this))
    .subscribe(res => {
      this.book = res;

      this.bookService.getImage(this.book.image?.id)
        .pipe(untilDestroyed(this))
        .subscribe(res => {
          this.bookImg = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + res.base64ImageRepresentation)
        })
    });     

    this.bookService.getUserBooks(this.authorizationService.getUserId())
      .pipe(untilDestroyed(this))
      .subscribe(res => { 
        this.books = res
      });      
  }

  public createOrder() {
    let order: Order = {
      id: 0,
      firstBookId: this.book.id,
      secondBookId: this.activeBookId, 
    }

    this.orderService.addOrder(order)
      .subscribe(res => {
        this.router.navigate(['/orders'])
      })  
  }

  getImage(id: number) {
    this.bookService.getImage(id)
      .subscribe(res => {
        console.log(res);
        
      });
  }
}
