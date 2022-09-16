import { Route, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBookComponent } from './main-book/main-book.component';
import { GenresContentComponent } from './genres-content/genres-content.component';


const routes: Routes = [
  { path: 'first-component', component: GenresContentComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    MainBookComponent,
    GenresContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,    
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
