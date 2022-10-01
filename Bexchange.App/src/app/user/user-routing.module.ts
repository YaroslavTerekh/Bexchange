import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddBookComponent } from "../add-book/add-book.component";
import { AuthorsContentComponent } from "../authors-content/authors-content.component";
import { BookContentComponent } from "../book-content/book-content.component";
import { CreateOrderComponent } from "../create-order/create-order.component";
import { ErrorPageComponent } from "../error-page/error-page.component";
import { GenresContentComponent } from "../genres-content/genres-content.component";
import { LibraryContentComponent } from "../library-content/library-content.component";
import { OrderContentComponent } from "../order-content/order-content.component";

const childRoutes: Routes = [
  { path: 'genres', component: GenresContentComponent },
  { path: 'authors', component: AuthorsContentComponent },
  { path: 'library', component: LibraryContentComponent },
  { path: 'library/user/:id', component: LibraryContentComponent },
  { path: 'library/genre/:genre', component: LibraryContentComponent },
  { path: 'library/author/:author', component: LibraryContentComponent },
  { path: 'book/:id', component: BookContentComponent },
  { path: 'error', component: ErrorPageComponent },
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