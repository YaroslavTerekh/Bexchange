import { AllDataService } from './../all-data.service';
import { Component, OnInit } from '@angular/core';
import { MainBookComponent } from '../main-book/main-book.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  slides = [
    {img: '../assets/book1.png'},
    {img: '../assets/book2.png'},
    {img: '../assets/book3.png'},
    {img: '../assets/book4.png'},
    {img: '../assets/book1.png'},
    {img: '../assets/book2.png'},
    {img: '../assets/book3.png'},
    {img: '../assets/book4.png'},
    {img: '../assets/book1.png'},
    {img: '../assets/book2.png'},
  ];

  slideConfig = { 
    slidesToShow: 5, 
    slidesToScroll: 5, 
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  constructor(private dataSvc: AllDataService) {
   }

  ngOnInit(): void {
  }

}
