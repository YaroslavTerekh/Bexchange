import { Component } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Genre } from "src/app/shared/models/Genre";

@UntilDestroy()
@Component({
  selector: 'app-admin-genres-create',
  templateUrl: './admin-genres-create.component.html',
  styleUrls: ['./admin-genres-create.component.scss']
})
export class AdminGenresCreateComponent {
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

  addGenre(): void {
    const newGenre: Genre = {
      id: 0,
      title: this.form.get('title')?.value,
      imgPath: this.form.get('imagePath')?.value,
      description: this.form.get('description')?.value
    }
    
    this.bookService.addGenre(newGenre)
      .pipe(untilDestroyed(this))
      .subscribe({next: res => {
        this.router.navigate(['/admin/stats']);
      }});
  }

}
