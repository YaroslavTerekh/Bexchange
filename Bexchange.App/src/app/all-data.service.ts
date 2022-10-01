import { Book } from './models/Book';
import { ChangeUserInfoRequest } from './models/ChangeUserInfoRequest';
import { Order } from './models/Order';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllDataService implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
  }  
}
