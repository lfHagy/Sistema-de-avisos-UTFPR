import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from '../../menu.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatFormFieldModule, MatInputModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['../dialog.css']
})
export class DeleteDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly menu = inject(MenuService);
  private readonly snackBar = inject(MatSnackBar);

  deleteForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  async submit() {
    const email = this.deleteForm.get("email")!.value!;
    const response = await this.menu.deleteUser(email);
    if (response?.status === 200) {
      this.snackBar.open("Usuário apagado.", "Ok", { duration: 5000 });
    } else if (response) {
      this.snackBar.open(`Não foi possível apagar: ${response.statusText}.`);
    } else { 
      this.snackBar.open("Não foi possível apagar.", "Ok", { duration: 5000 });
    }
  }
}
