import { AllDataService, Book } from './../all-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    this.http.get('https://localhost:7194/api/book/' + this.route.snapshot.params['id'])
      .subscribe(res => {
        this.book = res; 
      })

    console.log(this.book);
    console.log(this.route.snapshot.params['id']);
  }

}
