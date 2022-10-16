import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AdminServiceService } from "src/app/core/services/admin-service.service";
import { AuthorizationService } from "src/app/core/services/authorization.service";
import { User } from "src/app/shared/models/User";

@UntilDestroy()
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  userId!: number;

  constructor(
    private readonly adminService: AdminServiceService,
    private readonly authorizationsService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.adminService.getAllUsers()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.users = res;
        }
      });

    this.userId = this.authorizationsService.getUserId();
  }
}
