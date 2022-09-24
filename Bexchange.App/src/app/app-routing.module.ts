import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderContentComponent } from './order-content/order-content.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { BookContentComponent } from './book-content/book-content.component';
import { LibraryContentComponent } from './library-content/library-content.component';
import { AuthorsContentComponent } from './authors-content/authors-content.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresContentComponent } from './genres-content/genres-content.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'genres', component: GenresContentComponent },
  { path: 'authors', component: AuthorsContentComponent },
  { path: 'library', component: LibraryContentComponent },
  { path: 'book/:id', component: BookContentComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'create-book', component: AddBookComponent },
  { path: 'orders', component: OrderContentComponent },
  { path: 'create-order', component: CreateOrderComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
