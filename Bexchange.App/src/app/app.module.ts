
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './modules/admin-module/admin.module';
import { UserModule } from './modules/user/user.module';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AdminBookTextTrimPipe } from './pipes/admin-book-text-trim.pipe';


@NgModule({
  declarations: [  
    AdminBookTextTrimPipe
  ],
  imports: [
    AppRoutingModule,
    AdminModule,
    UserModule
  ],
  providers: [    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
