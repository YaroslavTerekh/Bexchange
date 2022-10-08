import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { BookService } from "src/app/services/book.service";
import { BookRequest } from "src/app/models/BookRequest";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit, OnDestroy {
  public genres: any;
  public selectedFile!: File;
  public form: FormGroup = new FormGroup({
    title: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),
    genre: this.fb.control('', [Validators.required]),
    author: this.fb.control('', [Validators.required]),
    image: this.fb.control('', [Validators.required]),
  });

  constructor(
    private bookService: BookService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bookService.getAllGenres()
      .subscribe({
        next: res => {
          this.genres = res;
        },
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      });
  }

  ngOnDestroy(): void {
      
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  addBook() {
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
      .subscribe(res => {
        this.bookService.addBook(newBook, res)
          .subscribe((res) => {
            this.router.navigate(['']);         
          });
      });
  }

}
