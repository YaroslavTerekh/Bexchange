import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RegisterRequest } from "../models/RegisterRequest";


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
