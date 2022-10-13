import { AdminAuthorsComponent } from './admin-authors/admin-authors.component';
import { AdminGenresComponent } from './admin-genres/admin-genres.component';
import { AdminBooksItemComponent } from './admin-books/admin-books-item/admin-books-item.component';
import { BookAllResolver } from './../../guards/resolvers/booksAll.resolver';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminAdminsComponent } from './admin-admins/admin-admins.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminStatsComponent } from './admin-stats/admin-stats.component';
import { IsAdminGuard } from './../../guards/is-admin.guard';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


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
