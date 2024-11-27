import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MenuService } from '../menu.service';
import { IUser } from '../../../core/interfaces/user';

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],  // Add MatInputModule here
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly menu = inject(MenuService);

  updateForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
    name: ['', [Validators.required, Validators.minLength(3)]]
  });

  submit() {
    const payload: IUser = {
      email: this.updateForm.get("email")!.value!,
      password: this.updateForm.get("password")!.value!,
      name: this.updateForm.get("name")!.value!
    }
    this.menu.updateUser(payload);
  }
}
