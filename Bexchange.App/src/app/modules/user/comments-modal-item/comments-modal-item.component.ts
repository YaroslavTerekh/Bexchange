import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-modal-item',
  templateUrl: './comments-modal-item.component.html',
  styleUrls: ['./comments-modal-item.component.scss']
})
export class CommentsModalItemComponent implements OnInit {
  @Input() comment!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
