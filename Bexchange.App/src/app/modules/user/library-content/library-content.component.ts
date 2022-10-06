import { Component, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/models/Book";

@Component({
  selector: 'app-library-content',
  templateUrl: './library-content.component.html',
  styleUrls: ['./library-content.component.scss']
})
export class LibraryContentComponent implements AfterViewInit {
  books: Book[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
    this.books = this.route.snapshot.data['books'];
  }
}
