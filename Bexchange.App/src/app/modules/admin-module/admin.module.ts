import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";

import { AdminAdminsComponent } from "./components/admin-admins/admin-admins.component";
import { AdminAuthorsItemComponent } from "./components/admin-authors/admin-authors-item/admin-authors-item.component";
import { AdminAuthorsComponent } from "./components/admin-authors/admin-authors.component";
import { AdminBooksItemComponent } from "./components/admin-books/admin-books-item/admin-books-item.component";
import { AdminBooksComponent } from "./components/admin-books/admin-books.component";
import { AdminGenresCreateComponent } from "./components/admin-genres/admin-genres-create/admin-genres-create.component";
import { AdminGenresItemComponent } from "./components/admin-genres/admin-genres-item/admin-genres-item.component";
import { AdminGenresComponent } from "./components/admin-genres/admin-genres.component";
import { AdminMainPageComponent } from "./components/admin-main-page/admin-main-page.component";
import { AdminOrdersItemComponent } from "./components/admin-orders/admin-orders-item/admin-orders-item.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminSidebarComponent } from "./components/admin-sidebar/admin-sidebar.component";
import { AdminStatsItemComponent } from "./components/admin-stats/admin-stats-item/admin-stats-item.component";
import { AdminStatsComponent } from "./components/admin-stats/admin-stats.component";
import { AdminUsersComponent } from "./components/admin-users/admin-users.component";



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
