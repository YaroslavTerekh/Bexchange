import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { AppComponent } from "src/app/app.component";
import { AboutUsPageComponent } from "./components/about-us-page/about-us-page.component";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { AuthorsContentComponent } from "./components/authors-content/authors-content.component";
import { BookContentFunctionsComponent } from "./components/book-content/book-content-functions/book-content-functions.component";
import { BookContentOwnerFunctionsComponent } from "./components/book-content/book-content-owner-functions/book-content-owner-functions.component";
import { BookContentComponent } from "./components/book-content/book-content.component";
import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { GenresContentComponent } from "./components/genres-content/genres-content.component";
import { LibraryContentBookComponent } from "./components/library-content/library-content-book/library-content-book.component";
import { LibraryContentSearchbarComponent } from "./components/library-content/library-content-searchbar/library-content-searchbar.component";
import { LibraryContentComponent } from "./components/library-content/library-content.component";
import { MainBookComponent } from "./components/main-book/main-book.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { OrderContentItemAdditionalComponent } from "./components/order-content/order-content-item-additional/order-content-item-additional.component";
import { OrderContentItemComponent } from "./components/order-content/order-content-item/order-content-item.component";
import { OrderContentComponent } from "./components/order-content/order-content.component";
import { AccountModalComponent } from "./modals/account-modal/account-modal.component";
import { AccountModifyComponent } from "./modals/account-modify/account-modify.component";
import { CommentsModalItemComponent } from "./modals/comments-modal/comments-modal-item/comments-modal-item.component";
import { CommentsModalComponent } from "./modals/comments-modal/comments-modal.component";
import { LoginModalComponent } from "./modals/login-modal/login-modal.component";
import { RegisterModalComponent } from "./modals/register-modal/register-modal.component";


@NgModule({
  declarations: [
    AppComponent,
    MainBookComponent,
    GenresContentComponent,
    MainPageComponent,
    AuthorsContentComponent,
    LibraryContentComponent,
    LibraryContentBookComponent,
    LibraryContentSearchbarComponent,
    BookContentComponent,
    BookContentFunctionsComponent,
    LoginModalComponent,
    RegisterModalComponent,
    AddBookComponent,
    OrderContentComponent,
    OrderContentItemComponent,
    OrderContentItemAdditionalComponent,
    CreateOrderComponent,
    AccountModalComponent,
    AccountModifyComponent,
    BookContentOwnerFunctionsComponent,
    CommentsModalComponent,
    CommentsModalItemComponent,
    AboutUsPageComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
