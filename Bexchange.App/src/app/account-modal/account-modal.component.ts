import { AuthorizationService } from './../authorization.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  userId: number = this.authorizationService.getUserId();
  
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  books() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/library/user', this.userId])
  }

  exit() {
    this.router.navigate(['']);
    this.authorizationService.exit();
  }

  isAdmin(): boolean {
    return this.authorizationService.isAdmin();
  }

}
