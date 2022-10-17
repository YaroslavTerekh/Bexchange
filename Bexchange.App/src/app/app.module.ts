import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AdminModule } from "./modules/admin-module/admin.module";
import { UserModule } from "./modules/user/user.module";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";

import { AuthInterceptorService } from "./core/interceptors/auth-interceptor.service";

import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [  
  ],
  imports: [
    AppRoutingModule,
    AdminModule,
    UserModule,
    SharedModule
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
