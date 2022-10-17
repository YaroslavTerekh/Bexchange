import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AdminServiceService } from "src/app/core/services/admin-service.service";
import { AuthorizationService } from "src/app/core/services/authorization.service";
import { User } from "src/app/shared/models/User";

@UntilDestroy()
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
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.userRole = +res.role;
        }
      });

    this.loggedUserRole = localStorage.getItem('loggedUserRole')?.toString();  
  }

  banUser(id: number): void {
    this.adminService.banUser(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.reloadPage();
        }
      });
  }

  unbanUser(id: number): void {
    this.adminService.unbanUser(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.reloadPage();
        }
      });
  }

  changeUserRole(role: number, id: number): void {
    this.adminService.changeUserRole(role, id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.reloadPage();
        }
      });
  }
  

  toggleButton(): void {
    if(this.changeRole == true) {
      this.changeRole = false;
    } else {
      this.changeRole = true;
    }
  }

  private reloadPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
