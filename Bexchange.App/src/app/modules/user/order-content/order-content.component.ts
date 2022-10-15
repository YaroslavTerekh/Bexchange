import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { OrderService } from "src/app/services/order.service";


@UntilDestroy()
@Component({
  selector: 'app-order-content',
  templateUrl: './order-content.component.html',
  styleUrls: ['./order-content.component.scss']
})
export class OrderContentComponent implements OnInit {
  show: number = -1;
  orders: any = [];
  incomingOrders: any;
  outgoingOrders: any;
  id: number | undefined;
  outActive!: boolean;
  inActive: boolean = true;
  isIncoming!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];  
    

    if(this.id == undefined) {
      this.orderService.getAllOrders()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {                    
          this.orders = res; 
        }
      })
    } else {
      this.orderService.getUserIncomingOrders(this.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.incomingOrders = res; 
          this.orders = this.incomingOrders;
        }
      })
      
      this.orderService.getUserOutgoingOrders(this.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {                 
          this.outgoingOrders = res; 
        }
      })
    }        
  }

  toggle(num: number) {
    this.show = num;
  }
}
