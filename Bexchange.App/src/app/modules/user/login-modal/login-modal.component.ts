import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginRequest } from "src/app/models/LoginRequest";
import { AuthorizationService } from "src/app/services/authorization.service";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  @Output() login = new EventEmitter<void>();
  public loginMethod!: string;
  public isValue: number = 0;
  role!: number;

  public form = new FormGroup({
      userName: this.fb.control(''),
      password: this.fb.control('')
  });

  constructor(
    private authorizationService: AuthorizationService,
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
    
    this.authorizationService.loginUser(user, this.loginMethod)
    .subscribe({
      next: token => {         
        this.authorizationService.logIn(token);
        console.log('done');
        
      },
      error: err => {
        this.router.navigate(['/error', {error: err}]);
      }
    });
  }
}
