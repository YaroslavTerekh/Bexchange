import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  isSuperAdmin!: boolean;

  constructor() { }

  ngOnInit(): void {
    let role = localStorage.getItem('loggedUserRole');

    if(role == "SuperAdmin") {
      this.isSuperAdmin = true;
    } else {
      this.isSuperAdmin = false;
    }
  }

}
