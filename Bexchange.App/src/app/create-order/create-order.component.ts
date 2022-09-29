import { AuthorizationService } from './../authorization.service';
import { BookService } from './../book.service';
import { OrderService } from './../order.service';
import { Order } from './../models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { AllDataService } from './../all-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Book } from '../models/Book';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})

@UntilDestroy()
export class CreateOrderComponent implements OnInit {
  books: any;
  book!: any;
  activeBookIndex!: number;
  activeBookId!: number;

  constructor(
    private orderService: OrderService,
    private bookService: BookService,
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bookService.getBook(this.route.snapshot.params['id'])
    .subscribe(res => {
      this.book = res;
    });     

    this.bookService.getUserBooks(this.authorizationService.getUserId())
      .pipe(untilDestroyed(this))
      .subscribe(res => { 
        this.books = res
      });      
  }

  public createOrder() {
    let order: Order = {
      firstBookId: this.book.id,
      secondBookId: this.activeBookId, 
    }

    this.orderService.addOrder(order)
      .subscribe(res => {
        this.router.navigate(['/orders'])
      })  
  }
}
