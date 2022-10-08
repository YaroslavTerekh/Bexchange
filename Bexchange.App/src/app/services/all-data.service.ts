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
