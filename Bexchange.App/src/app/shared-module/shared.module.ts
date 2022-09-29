import { AuthInterceptorService } from './../auth-interceptor.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppRoutingModule } from '../app-routing.module';
import { BookService } from '../book.service';
import { OrderService } from '../order.service';
import { RegistrationService } from '../registration.service';
import { AuthorizationService } from '../authorization.service';



@NgModule({
  declarations: [
    
  ],
  imports: [    
    CommonModule
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    BookService,
    OrderService,
    RegistrationService,
    AuthorizationService,
    AuthInterceptorService
  ]
})
export class SharedModule { }
