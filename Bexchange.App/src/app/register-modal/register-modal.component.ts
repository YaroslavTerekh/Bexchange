import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
