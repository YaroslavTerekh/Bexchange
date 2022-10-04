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
  isAdmin: boolean = false;

  constructor(
    private authorizationService: AuthorizationService,
  ) {}

  ngOnInit() {
    this.isAdmin = this.authorizationService.isAdmin();
  }

  isAuthorized(): boolean {
    return this.authorizationService.isAuthorized();
  }

  
}
