import { IsAdminGuard } from './../../guards/is-admin.guard';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorPageComponent } from "../shared-module/error-page/error-page.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { AuthorsContentComponent } from "./authors-content/authors-content.component";
import { BookContentComponent } from "./book-content/book-content.component";
import { CreateOrderComponent } from "./create-order/create-order.component";
import { GenresContentComponent } from "./genres-content/genres-content.component";
import { LibraryContentComponent } from "./library-content/library-content.component";
import { OrderContentComponent } from "./order-content/order-content.component";
import { BookResolver } from 'src/app/guards/resolvers/books.resolver';
import { UserBookResolver } from 'src/app/guards/resolvers/user-books.resolver';
import { AuthorBookResolver } from 'src/app/guards/resolvers/author-books.resolver';
import { GenreBookResolver } from 'src/app/guards/resolvers/genre-books.resolver';


const childRoutes: Routes = [
  { path: 'genres', component: GenresContentComponent },
  { path: 'authors', component: AuthorsContentComponent },
  {
    path: 'library',
    component: LibraryContentComponent,
    resolve: {
      books: BookResolver,
    }
  },
  {
    path: 'library/user/:id',
    component: LibraryContentComponent,
    resolve: {
      books: UserBookResolver,
    }
  },
  { 
    path: 'library/genre/:genre', 
    component: LibraryContentComponent, 
    resolve: {
      books: GenreBookResolver,
    }
  },
  { 
    path: 'library/author/:author', 
    component: LibraryContentComponent,
    resolve: {
      books: AuthorBookResolver,
    }
  },
  { path: 'book/:id', component: BookContentComponent },
  { path: 'create-book', component: AddBookComponent },
  { path: 'orders', component: OrderContentComponent },
  { path: 'orders/user/:id', component: OrderContentComponent },
  { path: 'create-order/:id', component: CreateOrderComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }