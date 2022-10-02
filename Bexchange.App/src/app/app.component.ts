import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

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
  accountModifyModal: boolean = false;

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  ngOnInit() {
  }

  isAuthorized(): boolean {
    return this.authorizationService.isAuthorized();
  }
}
