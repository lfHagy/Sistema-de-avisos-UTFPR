import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from '../../menu.service';
import { IUser } from '../../../../core/interfaces/user';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-get-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatFormFieldModule, MatInputModule],
  templateUrl: './get-dialog.component.html',
  styleUrls: ['../dialog.css']
})
export class GetDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly menu = inject(MenuService);
  private readonly snackBar = inject(MatSnackBar);

  foundUser: IUser | null = null;
  foundUsers: IUser[] = [];

  getForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  async getUser() {
    this.foundUsers = [];
    const response = await this.menu.getUser(this.getForm.get("email")?.value!);
    if (response) {
      this.foundUsers[0] = response!;
      this.snackBar.open("Usuário encontrado!", "Ok", { duration: 5000 })
    } else {
      this.snackBar.open("Usuário não encontrado.", "Ok", { duration: 5000 });
    }
  }

  async getUsers() {
    this.foundUsers = [];
    this.foundUsers = (await this.menu.listUsers());
    if (!this.foundUsers) this.snackBar.open("Não foi possível listar os usuários.", "Ok", { duration: 5000 });
  }
}
