import { BookService } from './../book.service';
import { Router } from '@angular/router';
import { CommentRequest } from './../models/CommentRequest';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Book } from '../models/Book';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss']
})
export class CommentsModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() book!: Book;
  form: FormGroup = new FormGroup({
    message: this.fb.control(''),
  });

  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {    
  }

  addComment() {
    const comment: CommentRequest = {
      message: this.form.get('message')?.value,
    }

    this.bookService.AddComment(this.book.id, comment)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {          
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url])
        }, 
        error: (err) => {
          console.log(err);
          
        }
      });
  }

}
