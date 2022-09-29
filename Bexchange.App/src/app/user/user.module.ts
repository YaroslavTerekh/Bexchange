import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';

import { AccountModalComponent } from '../account-modal/account-modal.component';
import { AccountModifyComponent } from '../account-modify/account-modify.component';
import { AddBookComponent } from '../add-book/add-book.component';
import { AppComponent } from '../app.component';
import { AuthorsContentComponent } from '../authors-content/authors-content.component';
import { BookContentFunctionsComponent } from '../book-content-functions/book-content-functions.component';
import { BookContentOwnerFunctionsComponent } from '../book-content-owner-functions/book-content-owner-functions.component';
import { BookContentComponent } from '../book-content/book-content.component';
import { CommentsModalItemComponent } from '../comments-modal-item/comments-modal-item.component';
import { CommentsModalComponent } from '../comments-modal/comments-modal.component';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { GenresContentComponent } from '../genres-content/genres-content.component';
import { LibraryContentBookComponent } from '../library-content-book/library-content-book.component';
import { LibraryContentSearchbarComponent } from '../library-content-searchbar/library-content-searchbar.component';
import { LibraryContentComponent } from '../library-content/library-content.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { MainBookComponent } from '../main-book/main-book.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { OrderContentItemAdditionalComponent } from '../order-content-item-additional/order-content-item-additional.component';
import { OrderContentItemComponent } from '../order-content-item/order-content-item.component';
import { OrderContentComponent } from '../order-content/order-content.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { TextTrimPipe } from '../text-trim.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppRoutingModule } from '../app-routing.module';
import { UserRoutingModule } from './user-routing.module';



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
    TextTrimPipe,
    ErrorPageComponent,
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
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
