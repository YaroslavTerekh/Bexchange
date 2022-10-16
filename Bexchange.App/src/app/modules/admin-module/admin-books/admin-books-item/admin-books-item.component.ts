import { BookService } from './../../../../services/book.service';
import { Router } from '@angular/router';
import { AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-admin-books-item',
  templateUrl: './admin-books-item.component.html',
  styleUrls: ['./admin-books-item.component.scss']
})
export class AdminBooksItemComponent {
  @Output() bookDeleted = new EventEmitter<void>();
  @Input() book!: Book;
  changeStatus!: boolean;
  error!: string;
  
  constructor(
    private readonly bookService: BookService,
    private readonly router: Router
  ) { }

  deleteBook(id: number) {
    this.bookService.deleteBook(id)
      .subscribe({
        next: res => { 
          this.router.navigate(['/admin/stats']);
        },
        error: err => {
          this.router.navigate(['/admin/orders']);
        }
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
      .subscribe({
        next: res => { 
          this.router.navigate(['/admin/stats']);
        },
        error: err => {
          this.router.navigate(['/admin/authors']);
        }
      });
  }

}
