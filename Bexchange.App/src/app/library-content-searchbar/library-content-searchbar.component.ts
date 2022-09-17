import { LibraryContentComponent } from './../library-content/library-content.component';
import { Component, Input, OnInit, ViewChildren, ElementRef, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-library-content-searchbar',
  templateUrl: './library-content-searchbar.component.html',
  styleUrls: ['./library-content-searchbar.component.scss']
})
export class LibraryContentSearchbarComponent implements OnInit {

  search(text: string) {
    let books = document.querySelectorAll('.lib-book');
    if(text != '') {
      books.forEach(el => {
        console.log(el.lastChild?.lastChild?.firstChild?.textContent);
        if(el.lastChild?.lastChild?.firstChild?.textContent?.search(`Title: ${text}`) == -1) {
          el.parentElement?.classList.add('hide');
        } else {
          el.parentElement?.classList.remove('hide');
        }
      });
    } else {
      books.forEach(el => {
        el.parentElement?.classList.remove('hide');
      });
    }
  }

  constructor() { 
    
  }

  ngOnInit(): void {
    this.search('');
  }

}
