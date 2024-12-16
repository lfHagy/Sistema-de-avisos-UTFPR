import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { CategoriesService } from '../../categories/categories.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly categoryService = inject(CategoriesService);

  goToUserPage() {
    this.router.navigate(["/user"]);
  }

  async goToCategories() {
    await  this.categoryService.findCategories();
    this.router.navigate(["/categories"]); // jerry rigged, but if I try to do this where it should be the program breaks
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["auth"]);
  }
}
