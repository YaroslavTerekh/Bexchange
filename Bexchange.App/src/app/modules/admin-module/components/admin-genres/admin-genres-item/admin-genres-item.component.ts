import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BookService } from "src/app/core/services/book.service";
import { Genre } from "src/app/shared/models/Genre";

@UntilDestroy()
@Component({
  selector: 'app-admin-genres-item',
  templateUrl: './admin-genres-item.component.html',
  styleUrls: ['./admin-genres-item.component.scss']
})
export class AdminGenresItemComponent implements OnInit {
  @Input() genre!: Genre;

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  deleteGenre(id: number): void {
    this.bookService.deleteGenre(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.router.navigate(['/admin/stats']);
        }
      });
  }

}
