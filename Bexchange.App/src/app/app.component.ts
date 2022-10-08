import { IsAdminGuard } from './guards/is-admin.guard';
import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService } from './services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Bexchange';
  modal: boolean = false;
  registerModal: boolean = false;
  accountModal: boolean = false;
  accountModifyModal: boolean = false;
  isAdmin: boolean = false;
  checkAuthorized!: boolean;

  constructor(
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit() {
    this.authorizationService.authorizationSubject
      .subscribe({
        next: res => {
          this.isAdmin = res;
        }
      });

    this.authorizationService.authorizationSubject
      .subscribe({
        next: res => {
          this.checkAuthorized = res;
        }
      });
  }
}
