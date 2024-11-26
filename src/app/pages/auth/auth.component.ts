import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
})
export class AuthComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
    ],
  });

  registerForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
    ],
  });

  hidePassword = true;
  authIsLoading = false;
  hasAccount = true;

  get email() {
    if (this.hasAccount) {
      return this.loginForm.get('email');
    } else {
      return this.registerForm.get('email');
    }
  }

  get password() {
    if (this.hasAccount) {
      return this.loginForm.get('password');
    } else {
      return this.registerForm.get('password');
    }
  }

  toggleLoginRegister() {
    this.hasAccount = !this.hasAccount;
  }

  async submit(): Promise<void> {
    this.authIsLoading = true;
    try {
      
    if (this.hasAccount) { // user is logging in
      const email = this.loginForm.get('email')!.value!;
      const password = this.loginForm.get('password')!.value!;
      console.log(password, email);
      //this.router.navigate(['home']);
      } else { // user is registering

      }
    } catch (error) {
      const snackBarMessage = ' Credenciais inválidas. ';
      this.snackBar.open(snackBarMessage, 'OK', { duration: 3000 });
      throw error;
    } finally {
      this.authIsLoading = false;
    }
  }
}
