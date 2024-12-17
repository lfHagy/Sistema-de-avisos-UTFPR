import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoriesService } from './categories.service';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private readonly snackBar = inject(MatSnackBar);

  foundCategories = this.categoryService.foundCategories;
  selectedCategory = this.categoryService.selectedCategory;
  isAdmin = this.authService.isAdmin;

  addCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, { data: { mode: 'post' } });
  }

  editCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, { data: { mode: 'put' } });
  }

  async deleteCategory() {
    try {
      await this.categoryService.deleteCategory(this.selectedCategory()?.id!);
      
      this.snackBar.open("Categoria apagada com sucesso!", "Ok", { duration: 5000 });
    } catch (error) {
      this.snackBar.open("Não foi possível apagar a categoria.", "Ok", { duration: 5000 });
      console.error("Could not delete category!", error);
    }
  }

  async refreshCategories() {
    await this.categoryService.findCategories();
  }

  async selectCategory(id: number) {
    await this.categoryService.refreshSelectedCategory(id);
  }

  ngOnDestroy() {
    this.selectedCategory.set(null);
  }
}
