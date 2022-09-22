import { AllDataService } from './../all-data.service';
import { Component, OnInit } from '@angular/core';
import { Author } from '../models/Author';

@Component({
  selector: 'app-authors-content',
  templateUrl: './authors-content.component.html',
  styleUrls: ['./authors-content.component.scss']
})
export class AuthorsContentComponent implements OnInit {

  authors?: Author[];

  constructor(dataSvc: AllDataService) { 
    this.authors = dataSvc.authors;
  }

  ngOnInit(): void {
  }

}
