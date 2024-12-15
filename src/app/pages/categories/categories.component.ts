import { Component, inject } from '@angular/core';
import { ToolbarComponent } from '../shared/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ToolbarComponent, MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  private readonly dialog = inject(MatDialog);  

  addCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {data: { mode: 'post'}});
  }
}
