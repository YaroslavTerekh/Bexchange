import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

export class Book{
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  genre: string | undefined;
  author: string | undefined;
  image: Image | undefined;
}

class Image {
  path: string | undefined;
}

export class Genre {
  title: string | undefined;
  img: string | undefined;

  constructor(title: string, path: string) {
    this.title = title;
    this.img = path;
  }
}

export class Author {
  name!: string;
  img!: string;

  constructor(name: string, img: string) {
    this.name = name;
    this.img = img;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AllDataService {

  public books?: any;

  genres: Genre[] | undefined = [
    new Genre('Action','../assets/book1.png'),
    new Genre('Action1','../assets/book2.png'),
    new Genre('Action','../assets/book1.png'),
    new Genre('Action1','../assets/book2.png'),
    new Genre('Action','../assets/book1.png'),
    new Genre('Action1','../assets/book2.png'),
  ];

  authors: Author[] | undefined = [
    new Author('Petro Mostavchuk','../assets/book1.png'),
    new Author('Petro Mostavchuk2','../assets/book2.png'),
    new Author('Petro Mostavchuk3','../assets/book3.png'),
    new Author('Petro Mostavchuk4','../assets/book4.png'),
  ];

  constructor(private http: HttpClient) {
    this.http.get('https://localhost:7194/api/book')
      .subscribe(res => {
        this.books = res;         
      })
   }
}
