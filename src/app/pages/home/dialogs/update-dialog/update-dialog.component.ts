import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from '../../menu.service';
import { IUser } from '../../../../core/interfaces/user';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatFormFieldModule, MatInputModule],
  templateUrl: './update-dialog.component.html',
  styleUrls: ['../dialog.css']
})
export class UpdateDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly menu = inject(MenuService);
  private readonly snackBar = inject(MatSnackBar);

  updateForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
    name: ['', [Validators.required, Validators.minLength(3)]]
  });

  async submit() {
    const payload: IUser = {
      email: this.updateForm.get("email")!.value!,
      password: this.updateForm.get("password")!.value!,
      name: this.updateForm.get("name")!.value!
    }
    const response = await this.menu.updateUser(payload);
    if (response?.status === 200) {
      this.snackBar.open("Usuário atualizado com sucesso!", "Ok", { duration: 5000 });
    } else if (response) {
      this.snackBar.open(`Não foi possível atualizar: ${response.statusText}.`);
    } else { 
      this.snackBar.open("Não foi possível atualizar.", "Ok", { duration: 5000 });
    }
  }
}
