import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegisterRequest } from "src/app/modules/user/models/RegisterRequest";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public register(model: RegisterRequest) : Observable<any> {
    return this.http.post(`${environment.bexchangeApi}User/register`, model, {
      responseType: "text",
    });
  }
}
