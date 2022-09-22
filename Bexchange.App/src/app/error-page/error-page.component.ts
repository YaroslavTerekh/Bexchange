import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.response = JSON.parse(this.route.snapshot.params['error']);     
    console.log(this.response);
    

    if(this.response) {
      this.code = this.response.error.code;
      this.description = this.response.error.response;
    }
  }

  response!: any;
  code!: string;
  description!: string;
}
