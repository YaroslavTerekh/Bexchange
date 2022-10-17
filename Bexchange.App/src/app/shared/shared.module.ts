import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { BookService } from 'src/app/core/services/book.service';
import { OrderService } from 'src/app/core/services/order.service';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { AuthInterceptorService } from '../core/interceptors/auth-interceptor.service';

import { TextTrimPipe } from 'src/app/shared/pipes/text-trim.pipe';

@NgModule({
  declarations: [
    ErrorPageComponent,
    TextTrimPipe,
    SpinnerComponent
  ],
  imports: [    
    CommonModule,
  ],
  exports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,    
    TextTrimPipe,
    SpinnerComponent
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
