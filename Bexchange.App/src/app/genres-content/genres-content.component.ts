import { AllDataService } from './../all-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Genre } from '../models/Genre';

@Component({
  selector: 'app-genres-content',
  templateUrl: './genres-content.component.html',
  styleUrls: ['./genres-content.component.scss']
})
export class GenresContentComponent implements OnInit {  
  genres?: Genre[];

  constructor(dataSvc: AllDataService) {
    this.genres = dataSvc.genres;
   }

  ngOnInit(): void {
  }

}
