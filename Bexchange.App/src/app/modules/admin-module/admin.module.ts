import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { AdminStatsComponent } from './admin-stats/admin-stats.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminAdminsComponent } from './admin-admins/admin-admins.component';
import { AdminStatsItemComponent } from './admin-stats/admin-stats-item/admin-stats-item.component';



@NgModule({
  declarations: [
    AdminMainPageComponent,
    AdminStatsComponent,
    AdminSidebarComponent,
    AdminUsersComponent,
    AdminBooksComponent,
    AdminOrdersComponent,
    AdminAdminsComponent,
    AdminStatsItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
