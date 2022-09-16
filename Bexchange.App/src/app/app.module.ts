import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBookComponent } from './main-book/main-book.component';
import { GenresContentComponent } from './genres-content/genres-content.component';
import { AuthorsContentComponent } from './authors-content/authors-content.component';

@NgModule({
  declarations: [
    AppComponent,
    MainBookComponent,
    GenresContentComponent,
    MainPageComponent,
    AuthorsContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
