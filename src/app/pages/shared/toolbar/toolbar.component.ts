import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

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

  goToUserPage() {
    this.router.navigate(["/user"]);
  }

  goToCategories() {
    this.router.navigate(["/categories"]);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["auth"]);
  }
}
