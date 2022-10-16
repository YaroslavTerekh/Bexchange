import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoaderService } from 'src/app/core/services/loader.service';

@UntilDestroy()
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  isLoading!: boolean;

  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.isLoading$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.isLoading = res;
        }
      });
  }

}
