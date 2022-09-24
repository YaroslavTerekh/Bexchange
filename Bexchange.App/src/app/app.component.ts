import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AllDataService } from './all-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{  
  title: string = 'Bexchange';
  modal: boolean = false;
  registerModal: boolean = false;
  accountModal: boolean = false;

  constructor(
    private dataService: AllDataService,
  ) {}

  ngOnInit() {
  }

  isAuthorized(): boolean {
    return this.dataService.isAuthorized();
  }
}
