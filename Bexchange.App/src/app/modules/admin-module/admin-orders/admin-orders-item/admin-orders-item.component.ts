import { Order } from 'src/app/models/Order';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders-item',
  templateUrl: './admin-orders-item.component.html',
  styleUrls: ['./admin-orders-item.component.scss']
})
export class AdminOrdersItemComponent implements OnInit {
  @Input() orders!: Order[];

  constructor() { }

  ngOnInit(): void {
  }

  deleteOrder(id: number) {
    
  }
}
