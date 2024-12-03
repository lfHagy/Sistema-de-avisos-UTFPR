import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IpInfoService } from '../shared/ip-info.service';
import { IUser } from '../../core/interfaces/user';

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
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
})
export class AuthComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly ipInfo = inject(IpInfoService);
  private snackBar = inject(MatSnackBar);

  hidePassword = true;
  authIsLoading = false;
  hasAccount = true;
  baseUrl = this.ipInfo.baseUrlSignal;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',
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

  toggleLoginRegister() {
    this.hasAccount = !this.hasAccount;
  }

  changeIp() {
    this.router.navigate([""]);
  }

  async submit(): Promise<void> {
    this.authIsLoading = true;
    try {
      if (this.hasAccount) {
        // user has an account
        const user: IUser = {
          email: this.loginForm.get('email')?.value!,
          password: this.loginForm.get('password')?.value!,
        };
        const response = await this.authService.login(user);
        if (response != 200) {
          this.snackBar.open(`Não foi possível fazer o login: ${response}`, 'Ok', {
            duration: 3000,
          });
        } else {
          this.router.navigate(['/home']);
        }
      } else {
        // user is registering
        const user: IUser = {
          name: this.registerForm.get('name')?.value!,
          email: this.registerForm.get('email')?.value!,
          password: this.registerForm.get('password')?.value!,
        };
        const response = await this.authService.register(user);
        if (response === 201) {
          this.snackBar.open("Usuário cadastrado com sucesso.", "Ok", { duration: 5000 });
          this.hasAccount = true;
        } else {
          this.snackBar.open("Não foi possível cadastrar o usuário.", "Ok", { duration: 5000 });
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this.authIsLoading = false;
    }
  }

  ngOnInit() {
    this.ipInfo.checkIp();
    localStorage.removeItem("token");
  }
}
