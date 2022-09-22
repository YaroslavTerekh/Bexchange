import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnInit {
  book!: any;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.http.get(`https://localhost:7194/api/Book/${this.route.snapshot.params['id']}`)
      .subscribe({
        next: res => {
          this.book = res; 
        },
        error: err => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      })
  }

}
