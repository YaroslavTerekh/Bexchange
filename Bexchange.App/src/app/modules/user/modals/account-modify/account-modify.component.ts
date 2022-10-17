import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthorizationService } from "src/app/core/services/authorization.service";
import { AddressInfo } from "src/app/shared/models/AddressInfo";
import { ChangeUserInfoRequest } from "../../models/ChangeUserInfoRequest";

@Component({
  selector: 'app-account-modify',
  templateUrl: './account-modify.component.html',
  styleUrls: ['./account-modify.component.scss']
})
export class AccountModifyComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  user: any;

  public form: FormGroup = new FormGroup({
    userName: this.fb.control('', [Validators.required, Validators.maxLength(15)]),
    firstName: this.fb.control('', [Validators.required, Validators.maxLength(20)]),
    lastName: this.fb.control('', [Validators.required, Validators.maxLength(20)]),
    email: this.fb.control('', [Validators.required, Validators.minLength(11), Validators.email]),
    country: this.fb.control('', [Validators.required]),
    city: this.fb.control('', [Validators.required]),
    postIndex: this.fb.control('', [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authorizationService.getUserInfo(this.authorizationService.getUserId())
      .subscribe({
        next: res => {
          this.user = res;
        }
      })
  }

  modify() {
    let user: ChangeUserInfoRequest = {
      id: this.user.id,
      userName: this.form.get('userName')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      address: {
        country: this.form.get('country')?.value,
        city: this.form.get('city')?.value,
        postIndex: this.form.get('postIndex')?.value
      } as unknown as AddressInfo,
    }     

    this.authorizationService.changeUserInfo(user)
      .subscribe();
  }

}
