import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { AuthorizationService } from '../authorization.service';
import { BookService } from '../book.service';
import { OrderService } from '../order.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    BookService,
    OrderService,
    AuthorizationService,
  ]
})
export class AdminModule { }
