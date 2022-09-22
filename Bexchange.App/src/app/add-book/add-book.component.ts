import { Router } from '@angular/router';
import { AllDataService } from './../all-data.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  public genres: any;

  constructor(
    private dataService: AllDataService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`${environment.bexchangeApi}Book/genres`)
      .subscribe({
        next: res => {
          this.genres = res;          
        }, 
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      });
  }

}
