import { Component, Inject, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatHint } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriesService } from '../../categories.service';
import { WarningService } from '../warning.service';

@Component({
  selector: 'app-warning-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogModule,
    MatButtonModule,
    MatHint
  ],
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css', '../../../shared/dialog.css']
})
export class WarningDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, mode: string }) { }

  private readonly categoryService = inject(CategoriesService);
  private readonly warningService = inject(WarningService);
  private readonly snackBar = inject(MatSnackBar);

  selectedCategory = this.categoryService.selectedCategory;
  warningText = new FormControl('', [Validators.required, Validators.maxLength(500)]);

  async submit() {
    try {
      if (this.data.mode == "post") await this.warningService.createWarning(this.warningText.value!, this.selectedCategory()!.id);
      else if (this.data.mode == "put") await this.warningService.updateWarning(this.warningText.value!, this.data.id, this.selectedCategory()!.id);
    } catch (error) {
      this.snackBar.open("Não foi possível subir o aviso.", "Ok", { duration: 5000 });
    }
  }
}
