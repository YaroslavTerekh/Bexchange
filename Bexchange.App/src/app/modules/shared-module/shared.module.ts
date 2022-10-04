
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { ErrorPageComponent } from './error-page/error-page.component';



@NgModule({
  declarations: [
    ErrorPageComponent
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
