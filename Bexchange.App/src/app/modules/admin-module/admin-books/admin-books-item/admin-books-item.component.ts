import { State } from './../../../../models/StateDictionary';
import { BookService } from './../../../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-admin-books-item',
  templateUrl: './admin-books-item.component.html',
  styleUrls: ['./admin-books-item.component.scss']
})
export class AdminBooksItemComponent implements AfterViewInit {
  @Output() bookDeleted = new EventEmitter<void>();
  @Input() book!: Book;
  changeStatus!: boolean;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
    private readonly router: Router
  ) { }

  ngAfterViewInit() {
    console.log(this.book);
    
    // this.route.parent?.data
    //   .subscribe(res => {
    //     this.books = res['books'];
    //   })
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id)
      .subscribe(res => { 
        this.router.navigate(['/admin/stats']);
      });
  }

  toggleButton() {
    if(this.changeStatus) {
      this.changeStatus = false;
    } else {
      this.changeStatus = true;
    }
  }

  modifyState(id: number, state: number) {
    this.bookService.modifyBookState(id, state)
      .subscribe(res => { 
          this.router.navigate(['/admin/stats']);
        
      });
  }

}
