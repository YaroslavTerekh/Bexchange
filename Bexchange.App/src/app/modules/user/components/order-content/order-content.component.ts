import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { OrderService } from "src/app/core/services/order.service";
import { Order } from "src/app/shared/models/Order";

@UntilDestroy()
@Component({
  selector: 'app-order-content',
  templateUrl: './order-content.component.html',
  styleUrls: ['./order-content.component.scss']
})
export class OrderContentComponent implements OnInit {
  show: number = -1;
  orders: any[] = [];
  incomingOrders!: Order[];
  outgoingOrders!: Order[];
  succededOrders!: Order[];
  id: number | undefined;
  outActive!: boolean;
  inActive: boolean = true;
  isIncoming!: boolean;
  successActive!: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];


    if (this.id == undefined) {
      this.orderService.getAllOrders()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.orders = res;
          }
        })
    } else {
      this.orderService.getUserIncomingOrders()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.incomingOrders = res;
            this.orders = this.incomingOrders;
          }
        })

      this.orderService.getUserOutgoingOrders()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.outgoingOrders = res;
          }
        })

      this.orderService.getUserSuccededOrders()
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            this.succededOrders = res;
          }
        })
    }
  }

  toggle(num: number): void {
    this.show = num;
  }
}
