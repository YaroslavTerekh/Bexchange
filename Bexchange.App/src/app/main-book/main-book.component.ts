import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main-book',
  templateUrl: './main-book.component.html',
  styleUrls: ['./main-book.component.scss']
})
export class MainBookComponent implements OnInit {

  @Input() slideList: any;
  @ViewChild("imgBlock", { static: false }) imgDIV: ElementRef|undefined;

  public slideImg: any;
  public i: number = 0;

  ngOnInit(): void {    
    this.slideImg = this.slideList[this.i].img;
    setInterval(() => {
      this.imgDIV?.nativeElement.classList.add('hide');
      setTimeout(() => {        
        if(this.i >= 8) this.i = 0;
        this.i++;
        this.slideImg = this.slideList[this.i].img;
        this.imgDIV?.nativeElement.classList.remove('hide');        
      }, 400);
    }, 10000)
  }
}
