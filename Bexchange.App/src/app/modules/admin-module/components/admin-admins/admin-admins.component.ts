import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AdminServiceService } from "src/app/core/services/admin-service.service";
import { User } from "src/app/shared/models/User";

@UntilDestroy()
@Component({
  selector: 'app-admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.scss']
})
export class AdminAdminsComponent implements OnInit {
  admins: User[] = [];

  constructor(
    private readonly adminService: AdminServiceService
  ) { }

  ngOnInit(): void {
    this.adminService.getAdmins()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.admins = res;
        }
      })
  }

}
