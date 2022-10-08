import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Genre } from './../../../../models/Genre';
import { BookService } from 'src/app/services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-genres-create',
  templateUrl: './admin-genres-create.component.html',
  styleUrls: ['./admin-genres-create.component.scss']
})
export class AdminGenresCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: this.fb.control('', [Validators.required]),
    imagePath: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required])
  });

  constructor(
    private readonly bookService: BookService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  addGenre() {
    const newGenre: Genre = {
      id: 0,
      title: this.form.get('title')?.value,
      imgPath: this.form.get('imagePath')?.value,
      description: this.form.get('description')?.value
    }

    console.log(newGenre);
    
    this.bookService.addGenre(newGenre)
      .subscribe({next: res => {
        this.router.navigate(['/admin/stats']);
      }});
  }

}
