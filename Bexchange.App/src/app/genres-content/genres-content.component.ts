import { Component, OnInit, Input } from '@angular/core';

class Genre {
  title: string | undefined;
  img: string | undefined;
}

@Component({
  selector: 'app-genres-content',
  templateUrl: './genres-content.component.html',
  styleUrls: ['./genres-content.component.scss']
})
export class GenresContentComponent implements OnInit {

  @Input() genres: Genre[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
