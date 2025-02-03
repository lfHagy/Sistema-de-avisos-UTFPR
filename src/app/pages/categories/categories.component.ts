import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider'
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { CategoriesService } from './categories.service';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarningDialogComponent } from './warnings/warning-dialog/warning-dialog.component';
import { WarningService } from './warnings/warning.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatButtonModule,
    MatDividerModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  private dialog = inject(MatDialog);
  private readonly categoryService = inject(CategoriesService);
  private readonly warningService = inject(WarningService);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  foundCategories = this.categoryService.foundCategories;
  foundWarnings = this.warningService.foundWarnings;
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

  addWarning() {
    this.dialog.open(WarningDialogComponent, { data: { mode: 'post' } });
  }

  updateWarning(warningId: number) {
    this.dialog.open(WarningDialogComponent, { data: { id: warningId, mode: 'put' } });
  }

  async deleteWarning(warningId: number, categoryId: number) {
    await this.warningService.deleteWarning(warningId, categoryId);
  }

  ngOnDestroy() {
    this.selectedCategory.set(null);
  }
}
