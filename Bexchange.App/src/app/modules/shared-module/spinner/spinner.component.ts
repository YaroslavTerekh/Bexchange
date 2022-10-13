import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  isLoading!: boolean;

  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.isLoading
      .subscribe({
        next: res => {
          this.isLoading = res;
        }
      });
  }

}
