import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { OrderService } from "src/app/core/services/order.service";
import { Order } from "src/app/shared/models/Order";

@UntilDestroy()
@Component({
  selector: 'app-order-content-item-additional',
  templateUrl: './order-content-item-additional.component.html',
  styleUrls: ['./order-content-item-additional.component.scss']
})
export class OrderContentItemAdditionalComponent implements OnInit {
  @Input() order!: Order;
  @Input() isIncoming!: boolean;

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: res => {
        this.refreshPage();
      }
    });
  }

  acceptOrder(id: number): void {
    this.orderService.acceptOrder(id)
    .pipe(untilDestroyed(this))
    .subscribe(res => {
      this.refreshPage();
    });
  }

  declineOrder(id: number): void {
    this.orderService.declineOrder(id)
    .pipe(untilDestroyed(this))
    .subscribe({
      next: res => {
        this.refreshPage();
      }
    });     
  }

  successOrder(id: number): void {
    this.orderService.successOrder(id)
    .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.refreshPage();
        }
      });
  }

  private refreshPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route,
    })
  }

}
