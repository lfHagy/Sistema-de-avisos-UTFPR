import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './pages/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {
  title = 'Sistema-de-Avisos-UTFPR';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loggedUser = this.authService.loggedUser;

  ngOnInit() {
    if (!localStorage.getItem('baseUrl')) {
      this.router.navigate(['/ip']);
    } else if (!this.loggedUser()) {
      this.router.navigate(['/auth']);
    }
  }
}
