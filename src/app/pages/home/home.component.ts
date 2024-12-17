import { Component, inject } from '@angular/core';
import { ToolbarComponent } from "../shared/toolbar/toolbar.component";
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  isAdmin = this.authService.isAdmin;
}
