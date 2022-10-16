import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Author } from "src/app/shared/models/Author";

@UntilDestroy()
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

  modifyAuthor(): void {
    const author: Author = {
      id: this.author.id,
      name: this.form.get('name')?.value,
      wikiLink: this.form.get('wikiLink')?.value,
      imgPath: this.form.get('imgPath')?.value
    };    

    this.bookService.modifyAuthor(author)
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
