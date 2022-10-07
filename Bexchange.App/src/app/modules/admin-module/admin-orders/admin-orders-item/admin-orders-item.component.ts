import { Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { OrderService } from './../../../../services/order.service';
import { Order } from 'src/app/models/Order';
import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

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

  deleteOrder(id: number) {
    this.orderService.deleteOrder(id)
      .subscribe(res => {
        this.router.navigate(['/admin/stats']);
      });
  }
}
