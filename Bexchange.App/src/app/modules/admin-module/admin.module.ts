import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared-module/shared.module';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { BookService } from 'src/app/services/book.service';
import { OrderService } from 'src/app/services/order.service';



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
