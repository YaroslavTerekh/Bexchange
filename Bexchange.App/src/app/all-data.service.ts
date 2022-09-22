import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Author } from './models/Author';
import { Genre } from './models/Genre';

@Injectable({
  providedIn: 'root'
})
export class AllDataService {

  public books?: any;

  genres: Array<Genre>= [
    {
      title: 'Action6',
      img: '../assets/book2.png',
    },
    {
      title: 'Action5',
      img: '../assets/book1.png',
    },
    {
      title: 'Action4',
      img: '../assets/book4.png',
    },
    {
      title: 'Action3',
      img: '../assets/book3.png',
    },
    {
      title: 'Action2',
      img: '../assets/book2.png',
    },
    {
      title: 'Action1',
      img: '../assets/book1.png',
    },
  ];

  authors: Author[] | undefined = [
    {
      name: 'petro mostavchuk',
      img: '../assets/book1.png',
    },
    {
      name: 'petro mostavchuk',
      img: '../assets/book1.png',
    },
    {
      name: 'petro mostavchuk',
      img: '../assets/book1.png',
    },
    {
      name: 'petro mostavchuk',
      img: '../assets/book1.png',
    },
    {
      name: 'petro mostavchuk',
      img: '../assets/book1.png',
    },
    {
      name: 'petro mostavchuk',
      img: '../assets/book1.png',
    },
  ];

  constructor(private http: HttpClient) {
    this.books = this.http.get('https://localhost:7194/api/book');
    
   }
}
