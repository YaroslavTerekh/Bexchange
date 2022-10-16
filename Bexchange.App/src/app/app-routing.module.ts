import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './modules/user/components/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

