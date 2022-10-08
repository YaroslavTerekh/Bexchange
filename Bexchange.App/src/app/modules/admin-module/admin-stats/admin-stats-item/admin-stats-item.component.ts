import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';
import { AdminServiceService } from './../../../../services/admin-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-admin-stats-item',
  templateUrl: './admin-stats-item.component.html',
  styleUrls: ['./admin-stats-item.component.scss']
})
export class AdminStatsItemComponent implements OnInit {
  @Input() user!: User;
  @Input() userId!: number;
  userRole!: number;
  changeRole!: boolean;
  loggedUserRole: string | undefined;

  constructor(
    private readonly adminService: AdminServiceService,
    private readonly router: Router,
    private readonly authorizationsService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.authorizationsService.getUserInfo(this.user.id)
      .subscribe(res => {
        this.userRole = +res.role;
      });

    this.loggedUserRole = localStorage.getItem('loggedUserRole')?.toString();
    console.log(this.loggedUserRole);
    
    
  }

  banUser(id: number) {
    this.adminService.banUser(id)
      .subscribe(res => {
        this.reloadPage();
      })
  }

  unbanUser(id: number) {
    this.adminService.unbanUser(id)
      .subscribe(res => {
        this.reloadPage();
      })
  }

  changeUserRole(role: number, id: number) {
    this.adminService.changeUserRole(role, id)
      .subscribe(res => {
        this.reloadPage();
        // console.log(res);        
      })
  }
  

  toggleButton() {
    if(this.changeRole == true) {
      this.changeRole = false;
    } else {
      this.changeRole = true;
    }
  }

  private reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
