import { untilDestroyed } from '@ngneat/until-destroy';
import { BookService } from 'src/app/services/book.service';
import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Genre } from 'src/app/models/Genre';
import { Router } from '@angular/router';

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

  deleteGenre(id: number) {
    console.log('try');
    
    this.bookService.deleteGenre(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.router.navigate(['/admin/stats']);
        }
      });
  }

}
