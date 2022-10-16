import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { OrderService } from "src/app/core/services/order.service";
import { Order } from "src/app/shared/models/Order";

@UntilDestroy()
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private readonly orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderService.getAllOrders()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.orders = res;
        }
      });
  }

}
