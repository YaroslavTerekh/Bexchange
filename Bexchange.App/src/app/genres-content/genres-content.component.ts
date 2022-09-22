import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AllDataService } from './../all-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Genre } from '../models/Genre';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-genres-content',
  templateUrl: './genres-content.component.html',
  styleUrls: ['./genres-content.component.scss']
})
export class GenresContentComponent implements OnInit {  
  genres: any;

  constructor(
    private http: HttpClient,
    private router: Router
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
