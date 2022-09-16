import { Component, OnInit, Input } from '@angular/core';

class Genre {
  title: string | undefined;
  img: string | undefined;

  constructor(title: string, path: string) {
    this.title = title;
    this.img = path;
  }
}

@Component({
  selector: 'app-genres-content',
  templateUrl: './genres-content.component.html',
  styleUrls: ['./genres-content.component.scss']
})
export class GenresContentComponent implements OnInit {

  genres: Genre[] | undefined = [
    new Genre('Action','../assets/book1.png'),
    new Genre('Action1','../assets/book2.png'),
    new Genre('Action','../assets/book1.png'),
    new Genre('Action1','../assets/book2.png'),
    new Genre('Action','../assets/book1.png'),
    new Genre('Action1','../assets/book2.png'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
