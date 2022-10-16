import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IsAuthorizedGuard } from "src/app/core/guards/is-authorized.guard";
import { AuthorBookResolver } from "src/app/core/resolvers/author-books.resolver";
import { BookResolver } from "src/app/core/resolvers/books.resolver";
import { GenreBookResolver } from "src/app/core/resolvers/genre-books.resolver";
import { UserBookResolver } from "src/app/core/resolvers/user-books.resolver";
import { ErrorPageComponent } from "src/app/shared/components/error-page/error-page.component";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { AuthorsContentComponent } from "./components/authors-content/authors-content.component";
import { BookContentComponent } from "./components/book-content/book-content.component";
import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { GenresContentComponent } from "./components/genres-content/genres-content.component";
import { LibraryContentComponent } from "./components/library-content/library-content.component";
import { OrderContentComponent } from "./components/order-content/order-content.component";

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
    },
    canActivate: [
      IsAuthorizedGuard
    ]
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
  { 
    path: 'book/:id', 
    component: BookContentComponent,
    // canActivate: [
    //   IsAuthorizedGuard
    // ]
   },
  { 
    path: 'create-book', 
    component: AddBookComponent,
    canActivate: [
      IsAuthorizedGuard
    ]
  },
  { 
    path: 'orders', 
    component: OrderContentComponent,
    canActivate: [
      IsAuthorizedGuard
    ]
  },
  { 
    path: 'orders/user/:id', 
    component: OrderContentComponent,
    canActivate: [
      IsAuthorizedGuard
    ]
  },
  { 
    path: 'create-order/:id', 
    component: CreateOrderComponent,
    canActivate: [
      IsAuthorizedGuard
    ]
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }