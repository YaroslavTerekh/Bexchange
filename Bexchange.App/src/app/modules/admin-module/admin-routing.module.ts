import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IsAdminGuard } from "src/app/core/guards/is-admin.guard";
import { BookAllResolver } from "src/app/core/resolvers/booksAll.resolver";
import { AdminAdminsComponent } from "./components/admin-admins/admin-admins.component";
import { AdminAuthorsComponent } from "./components/admin-authors/admin-authors.component";
import { AdminBooksComponent } from "./components/admin-books/admin-books.component";
import { AdminGenresComponent } from "./components/admin-genres/admin-genres.component";
import { AdminMainPageComponent } from "./components/admin-main-page/admin-main-page.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminStatsComponent } from "./components/admin-stats/admin-stats.component";
import { AdminUsersComponent } from "./components/admin-users/admin-users.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminMainPageComponent,
        canActivate: [
            IsAdminGuard
        ],
        children: [
            {
                path: 'stats',
                component: AdminStatsComponent,                
            },
            {
                path: 'orders',
                component: AdminOrdersComponent,
            },
            {
                path: 'users',
                component: AdminUsersComponent,
            },
            {
                path: 'admins',
                component: AdminAdminsComponent,
            },
            {
                path: 'books',
                component: AdminBooksComponent,
                resolve: {
                    books : BookAllResolver
                }
            },
            {
                path: 'genres',
                component: AdminGenresComponent
            },
            {
                path: 'authors',
                component: AdminAuthorsComponent
            }
        ]
    },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
