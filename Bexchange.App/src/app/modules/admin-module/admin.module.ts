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
import { AdminBooksItemComponent } from './admin-books/admin-books-item/admin-books-item.component';
import { AdminOrdersItemComponent } from './admin-orders/admin-orders-item/admin-orders-item.component';
import { AdminGenresComponent } from './admin-genres/admin-genres.component';
import { AdminGenresCreateComponent } from './admin-genres/admin-genres-create/admin-genres-create.component';
import { AdminGenresItemComponent } from './admin-genres/admin-genres-item/admin-genres-item.component';
import { AdminAuthorsComponent } from './admin-authors/admin-authors.component';
import { AdminAuthorsItemComponent } from './admin-authors/admin-authors-item/admin-authors-item.component';



@NgModule({
  declarations: [
    AdminMainPageComponent,
    AdminStatsComponent,
    AdminSidebarComponent,
    AdminUsersComponent,
    AdminBooksComponent,
    AdminOrdersComponent,
    AdminAdminsComponent,
    AdminStatsItemComponent,
    AdminBooksItemComponent,
    AdminOrdersItemComponent,
    AdminGenresComponent,
    AdminGenresCreateComponent,
    AdminGenresItemComponent,
    AdminAuthorsComponent,
    AdminAuthorsItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
})
export class AdminModule { }
