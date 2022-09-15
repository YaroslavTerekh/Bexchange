import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bexchange.App';

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
}
