import { Component, OnInit, Input } from '@angular/core';

class Book{
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  genre: string | undefined;
  author: string | undefined;
  img: string | undefined;
  
  constructor(id: number, title: string, description: string, author: string, genre: string, img: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.img = img;
    this.genre = genre;
  }
}

@Component({
  selector: 'app-library-content-book',
  templateUrl: './library-content-book.component.html',
  styleUrls: ['./library-content-book.component.scss']
})
export class LibraryContentBookComponent implements OnInit {

  @Input() book!: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
