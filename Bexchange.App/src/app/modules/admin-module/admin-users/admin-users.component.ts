import { AuthorizationService } from 'src/app/services/authorization.service';
import { AdminServiceService } from './../../../services/admin-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

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
      .subscribe({
        next: res => {
          this.users = res;
        }
      });

    this.userId = this.authorizationsService.getUserId();
  }
}
