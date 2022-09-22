import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AuthorizationService } from './../authorization.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest'

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  public loginMethod!: string;
  public isValue: number = 0;
  public form = new FormGroup({
      userName: this.fb.control(''),
      password: this.fb.control('')
  });

  constructor(
    private authSvc: AuthorizationService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    
  }

  toggle1() {
    this.isValue = 1
  }

  toggle2() {
    this.isValue = 2
  }

  public logIn(): void {
    const user: LoginRequest = {
      userName: this.form.get('userName')?.value,
      password: this.form.get('password')?.value
    }
    
    this.authSvc.loginUser(user, this.loginMethod)
    .subscribe({
      next: token => {
        localStorage.setItem('authToken', token);   
      },
      error: err => {
        this.router.navigate(['/error', {error: err}]);
      }
    });
  }
}
