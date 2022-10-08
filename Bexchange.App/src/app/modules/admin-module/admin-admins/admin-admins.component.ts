import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { User } from 'src/app/models/User';
import { AdminServiceService } from 'src/app/services/admin-service.service';

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
      .subscribe({
        next: res => {
          this.admins = res;
        }
      })
  }

}
