import { AuthorsContentComponent } from './authors-content/authors-content.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresContentComponent } from './genres-content/genres-content.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'genres', component: GenresContentComponent },
  { path: 'authors', component: AuthorsContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
