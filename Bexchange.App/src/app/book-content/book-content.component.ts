import { Component, Input, OnInit } from '@angular/core';

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
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnInit {

  @Input() id!: number;
  public book!: Book;

  books: Book[] = [
    new Book(1, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book1.png'),
    new Book(2, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Steaven King', 'Action2', '../assets/book2.png'),
    new Book(3, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book3.png'),
    new Book(4, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book4.png'),
    new Book(5, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book1.png'),
    new Book(6, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book2.png'),
    new Book(7, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book3.png'),
    new Book(8, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book4.png'),
    new Book(9, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book1.png'),
    new Book(10, 'TestBook', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'
    , 'Tom Cruse', 'Action', '../assets/book2.png'),
  ];  
  private _route: number | undefined;

  constructor() { 
    
  }

  ngOnInit(): void {
    this.books.forEach(element => {
      if(element.id == this._route) {
        this.book = element;
      }
    });
  }

}
