import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoriesService } from './categories.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ToolbarComponent, MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  private dialog = inject(MatDialog);
  private readonly categoryService = inject(CategoriesService); 
  private readonly authService = inject(AuthService);

  foundCategories = this.categoryService.foundCategories;
  selectedCategory = this.categoryService.selectedCategory;
  isAdmin = this.authService.isAdmin;

  addCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {data: { mode: 'post'}});
  }

  editCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {data: { mode: 'put'}});
  }

  async deleteCategory() {
    await this.categoryService.deleteCategory(this.selectedCategory()?.id!);
  }

  async refreshCategories() {
    await this.categoryService.findCategories();
  }

  async selectCategory(id: number) {
    await this.categoryService.refreshSelectedCategory(id);
  }
}