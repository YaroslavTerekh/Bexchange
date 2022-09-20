import { AuthInterceptorService } from './auth-interceptor.service';
import { AllDataService } from './all-data.service';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBookComponent } from './main-book/main-book.component';
import { GenresContentComponent } from './genres-content/genres-content.component';
import { AuthorsContentComponent } from './authors-content/authors-content.component';
import { LibraryContentComponent } from './library-content/library-content.component';
import { LibraryContentBookComponent } from './library-content-book/library-content-book.component';
import { LibraryContentSearchbarComponent } from './library-content-searchbar/library-content-searchbar.component';
import { BookContentComponent } from './book-content/book-content.component';
import { BookContentFunctionsComponent } from './book-content-functions/book-content-functions.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextTrimPipe } from './text-trim.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AllDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
