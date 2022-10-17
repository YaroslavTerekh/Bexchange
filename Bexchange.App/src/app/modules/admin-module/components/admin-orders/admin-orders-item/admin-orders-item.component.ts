import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { OrderService } from "src/app/core/services/order.service";
import { Order } from "src/app/shared/models/Order";

@UntilDestroy()
@Component({
  selector: 'app-admin-orders-item',
  templateUrl: './admin-orders-item.component.html',
  styleUrls: ['./admin-orders-item.component.scss']
})
export class AdminOrdersItemComponent implements OnInit {
  @Input() order!: Order;

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {    
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.router.navigate(['/admin/stats']);
        }
      });
  }
}
