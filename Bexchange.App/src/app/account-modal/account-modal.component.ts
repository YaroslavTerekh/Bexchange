import { AllDataService } from './../all-data.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  
  constructor(
    private dataService: AllDataService
  ) { }

  ngOnInit(): void {
  }

  exit() {
    this.dataService.exit();
  }

}
