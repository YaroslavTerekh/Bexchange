import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { RegistrationService } from "src/app/core/services/registration.service";
import { AddressInfo } from "src/app/shared/models/AddressInfo";
import { RegisterRequest } from "../../models/RegisterRequest";

@UntilDestroy()
@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  public errorMessage: string | undefined;
  public form: FormGroup = new FormGroup({
    userName: this.fb.control('', [Validators.required, Validators.minLength(5)]),
    firstName: this.fb.control('', [Validators.required]),
    lastName: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.minLength(11), Validators.email]),
    country: this.fb.control('', [Validators.required]),
    city: this.fb.control('', [Validators.required]),
    postIndex: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  constructor(
    private registerService: RegistrationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  public register() {
    const user: RegisterRequest = {
      userName: this.form.get('userName')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      addressInfo: {
        country: this.form.get('country')?.value,
        city: this.form.get('city')?.value,
        postIndex: this.form.get('postIndex')?.value
      } as unknown as AddressInfo,
      password: this.form.get('password')?.value,
    }    
    
    this.registerService.register(user)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => {
          this.close.emit();
        }
      });
  }
}
