import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { BookService } from "src/app/core/services/book.service";
import { BookRequest } from "src/app/modules/user/models/BookRequest";
import { Genre } from "src/app/shared/models/Genre";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  public genres!: Genre[];
  public selectedFile!: File;
  public form: FormGroup = new FormGroup({
    title: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),
    genre: this.fb.control('', [Validators.required]),
    author: this.fb.control('', [Validators.required]),
    image: this.fb.control('', [Validators.required]),
  });

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bookService.getAllGenres()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.genres = res;
        }
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = <File>event.target.files[0];
  }

  addBook(): void {
    const newBook: BookRequest = {
      userId: 0,
      id: 0,
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      comments: null,
      genreId: this.form.get('genre')?.value,
      author: {
        id: 0,
        name: this.form.get('author')?.value,
        wikiLink: null,
        imgPath: null
      },
      image: null
    }

    let requestData = new FormData();
    requestData.append('image', this.selectedFile, this.selectedFile?.name);

    
    this.bookService.addImage(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.bookService.addBook(newBook, res)
          .subscribe((res) => {
            this.router.navigate(['']);         
          });
      });
  }

}
