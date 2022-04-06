import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
})
export class RatingStarsComponent implements OnInit {
  @Input() rating: number = -1;
  @Input() maxRating: number = 5;

  randomStars = () => {
    return Math.floor(Math.random() * this.maxRating);
  };

  ngOnInit() {
    if (this.rating === -1) this.rating = this.randomStars();
  }
}
