import { Component, Inject, inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { CategoriesService } from '../categories.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [MatButton, MatInput, MatFormField, ReactiveFormsModule],
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css', '../../shared/dialog.css'],
})
export class CategoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, mode: string }) { }

  private readonly categoryService = inject(CategoriesService);
  selectedCategory = this.categoryService.selectedCategory;
  categoryName = new FormControl('', [Validators.required]);

  async submit() {
    try {
      if (this.data.mode === 'post') {
        await this.categoryService.addCategory(this.categoryName.value!);
      } else if (this.data.mode === 'put') {
        const payload = {
          nome: this.categoryName.value
        }
        await this.categoryService.updateCategory(this.selectedCategory()!.id, payload);
      }
    } catch (error) {
      console.error("Could not submit: ", error);
    }
  }
}
