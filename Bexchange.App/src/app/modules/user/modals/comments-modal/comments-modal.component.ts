import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Book } from "src/app/shared/models/Book";
import { CommentRequest } from "../../models/CommentRequest";

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

    this.bookService.addComment(this.book.id, comment)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {          
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([this.router.url])
        }
      });
  }

}
