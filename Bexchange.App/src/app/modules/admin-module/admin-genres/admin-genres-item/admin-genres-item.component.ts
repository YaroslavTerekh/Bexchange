import { BookService } from 'src/app/services/book.service';
import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Genre } from 'src/app/models/Genre';

@UntilDestroy()
@Component({
  selector: 'app-admin-genres-item',
  templateUrl: './admin-genres-item.component.html',
  styleUrls: ['./admin-genres-item.component.scss']
})
export class AdminGenresItemComponent implements OnInit {
  @Input() genre!: Genre;
  // genreImg!: string;

  constructor(
    private readonly bookService: BookService
  ) { }

  ngOnInit(): void {
    // this.bookService.getImage(this.genre.img?.id)
    //   .subscribe({
    //     next: res => {
    //       this.genreImg = res;
    //     },
    //   });
  }

}
