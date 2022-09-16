import { Component, OnInit } from '@angular/core';

class Author {
  name!: string;
  img!: string;

  constructor(name: string, img: string) {
    this.name = name;
    this.img = img;
  }
}

@Component({
  selector: 'app-authors-content',
  templateUrl: './authors-content.component.html',
  styleUrls: ['./authors-content.component.scss']
})
export class AuthorsContentComponent implements OnInit {

  authors: Author[] | undefined = [
    new Author('Petro Mostavchuk','../assets/book1.png'),
    new Author('Petro Mostavchuk2','../assets/book2.png'),
    new Author('Petro Mostavchuk3','../assets/book3.png'),
    new Author('Petro Mostavchuk4','../assets/book4.png'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
