import { Component, Inject, inject, Input } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../user.service';
import { IUser } from '../../../../core/interfaces/user';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatFormFieldModule, MatInputModule],
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.css']
})
export class UpdateDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {email: string}) { }

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);

  loggedUser = this.userService.loggedUser;
  isAdmin = this.userService.isAdmin;

  updateForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
    name: ['', [Validators.required, Validators.minLength(3)]]
  });

  async submit() {
    const payload: IUser = {
      email: this.data.email,
      password: this.updateForm.get("password")!.value!,
      name: this.updateForm.get("name")!.value!
    }
    const response = await this.userService.updateUser(payload);
    if (response?.status === 200) {
      this.snackBar.open("Usuário atualizado com sucesso!", "Ok", { duration: 5000 });
    } else if (response) {
      this.snackBar.open(`Não foi possível atualizar: ${response.statusText}.`);
    } else { 
      this.snackBar.open("Não foi possível atualizar.", "Ok", { duration: 5000 });
    }
  }
}
