import { Component, Inject, inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { CategoriesService } from '../categories.service';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MatButton, MatInput, MatFormField, ReactiveFormsModule, MatDialogClose],
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css', '../../shared/dialog.css'],
})
export class CategoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {mode: string }) { }

  private readonly categoryService = inject(CategoriesService);
  private readonly snackBar = inject(MatSnackBar);
  selectedCategory = this.categoryService.selectedCategory;
  categoryName = new FormControl('', [Validators.required]);

  async submit() {
    try {
      if (this.data.mode === 'post') {
        await this.categoryService.addCategory(this.categoryName.value!);
        this.snackBar.open("Categoria inserida com sucesso!", "Ok", { duration: 5000 });
      } else if (this.data.mode === 'put') {
        const payload = {
          nome: this.categoryName.value
        }
        await this.categoryService.updateCategory(this.selectedCategory()!.id, payload);
        this.snackBar.open("Categoria atualizada com sucesso!", "Ok", { duration: 5000 });
      }
    } catch (error) {
      this.snackBar.open("Não foi possível subir a categoria.", "Ok", { duration: 5000 });
      console.error("Could not submit: ", error);
    }
  }
}
