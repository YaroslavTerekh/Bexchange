import { Router, ActivatedRoute } from '@angular/router';
import { AllDataService } from './../all-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/Order';

@Component({
  selector: 'app-order-content-item-additional',
  templateUrl: './order-content-item-additional.component.html',
  styleUrls: ['./order-content-item-additional.component.scss']
})
export class OrderContentItemAdditionalComponent implements OnInit {
  @Input() order: any;
  @Input() isIncoming!: boolean;

  constructor(
    private dataService: AllDataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  deleteOrder(id: number) {
    this.dataService.deleteOrder(id)
    .subscribe(res => {
      this.refreshPage();
    });
  }

  acceptOrder(id: number) {
    this.dataService.acceptOrder(id)
    .subscribe(res => {
      this.refreshPage();
    });
  }

  declineOrder(id: number) {
    this.dataService.declineOrder(id)
    .subscribe(res => {
      this.refreshPage();
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
