import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonComponent } from '../../components';
import { AuthSerivce } from '../../data-access/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  imports: [
    ButtonComponent,
    
    ReactiveFormsModule, NzCheckboxModule, NzFormModule, NzInputModule, NzIconModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  providers: [
    AuthSerivce
  ]
})
export class LoginForm {
  private readonly service = inject(AuthSerivce);
  private readonly router = inject(Router)

  
  isLoading = signal(false)

 private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true)
  });
 
  submitForm(): void {
    if (this.validateForm.valid) {
      this.onSignIn()
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onSignIn() {
    this.isLoading.set(true);
    const dto = {
      email: this.validateForm.value.email,
      password: this.validateForm.value.password,
      remember: this.validateForm.value.remember
    }
    this.service.signIn(dto).subscribe(
      res =>  this.router.navigate(['/'])
    )
  }
}
