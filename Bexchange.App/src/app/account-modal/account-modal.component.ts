import { Router } from '@angular/router';
import { AllDataService } from './../all-data.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() modifyAccount = new EventEmitter<void>();
  userId: number = this.dataService.getUserId();
  
  constructor(
    private dataService: AllDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  exit() {
    this.dataService.exit();
  }

  orders() {
    this.router.navigate(['/orders', this.userId]);
  }

  books() {
    this.router.navigate(['/library', this.userId]);
  }

  isAdmin(): boolean {
    return this.dataService.isAdmin();
  }

}
