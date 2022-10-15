import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { Author } from './../../../../models/Author';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-authors-item',
  templateUrl: './admin-authors-item.component.html',
  styleUrls: ['./admin-authors-item.component.scss']
})
export class AdminAuthorsItemComponent implements OnInit {
  @Input() author!: Author;
  form: FormGroup = new FormGroup({
    name: this.fb.control('', [Validators.required]),
    wikiLink: this.fb.control('', [Validators.required]),
    imgPath: this.fb.control('', [Validators.required]),
  });

  constructor(
    private readonly bookService: BookService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    
  }

  modifyAuthor() {
    const author: Author = {
      id: this.author.id,
      name: this.form.get('name')?.value,
      wikiLink: this.form.get('wikiLink')?.value,
      imgPath: this.form.get('imgPath')?.value
    };    

    this.bookService.modifyAuthor(author)
      .subscribe();
  }
}
