import { LibraryContentComponent } from './../library-content/library-content.component';
import { Component, Input, OnInit, ViewChildren, ElementRef, Output, EventEmitter } from '@angular/core';

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
        if(el.lastChild?.lastChild?.firstChild?.textContent?.search(`Назва: ${text}`) == -1) {
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
