import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs/operators";
import { AuthorizationService } from "src/app/core/services/authorization.service";
import { BookService } from "src/app/core/services/book.service";
import { OrderService } from "src/app/core/services/order.service";
import { Book } from "src/app/shared/models/Book";
import { OrderRequest } from "../../models/OrderRequest";
import { StateDictionary } from "../../models/StateDictionary";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})

@UntilDestroy()
export class CreateOrderComponent implements OnInit {
  userId: number = this.authorizationService.getUserId();
  stateDict: StateDictionary = new StateDictionary();
  books: Book[] = [];
  book!: Book;
  bookImg!: string | ArrayBuffer | null;
  activeBookIndex!: number;
  activeBookId!: number;
  

  constructor(
    private readonly orderService: OrderService,
    private readonly bookService: BookService,
    private readonly authorizationService: AuthorizationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.bookService.getBook(this.route.snapshot.params['id'])
    .pipe(untilDestroyed(this))
    .subscribe({
      next: res => {      
        this.book = res;
  
        this.bookService.getImage(this.book.image?.id)
          .pipe(untilDestroyed(this))
          .subscribe(res => {
            this.createImageFromBlob(res);
          })
      }
    });

    this.bookService.getUserBooks(this.authorizationService.getUserId())
      .pipe(
        untilDestroyed(this),
        map(res => {
          res.forEach(b => {
            if(b.state == 1) {
              this.books.push(b);
            }
          })
        })  
      )
      .subscribe();
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

  createOrder(): void {
    let order: OrderRequest = {
      id: 0,
      firstBookId: this.book.id,
      secondBookId: this.activeBookId, 
    }

    this.orderService.addOrder(order)
      .subscribe(res => {
        this.router.navigate(['/orders/user/',this.userId]);
      });
  }

}
