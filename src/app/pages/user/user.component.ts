import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ToolbarComponent } from "../shared/toolbar/toolbar.component";
import { UserService } from './user.service';
import { UserCardComponent } from "./user-card/user-card.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ToolbarComponent, UserCardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);

  loggedUser = this.authService.loggedUser;
  foundUsers = this.userService.foundUsers;
  isAdmin = this.userService.isAdmin;

  async ngOnInit() {
    if (this.isAdmin()) {
      await this.userService.listUsers();
      console.log(this.foundUsers)
    }
    const email = this.loggedUser()?.email;
    if (email) this.loggedUser.set(await this.userService.getUser(email));
  }
}
