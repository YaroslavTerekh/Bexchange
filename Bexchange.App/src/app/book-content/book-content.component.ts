import { AllDataService } from './../all-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/Book';

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnInit {
  book!: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, dataSvc: AllDataService) {
  }

  ngOnInit(): void {
    this.http.get(`https://localhost:7194/api/Book/${this.route.snapshot.params['id']}`)
      .subscribe(res => {
        this.book = res; 
      })
  }

}
