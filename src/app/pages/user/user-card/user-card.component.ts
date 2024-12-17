import { Component, inject, Input } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  private dialog = inject(MatDialog);

  @Input() name: string = 'Sem nome';
  @Input() email: string = 'Sem email';

  isAdmin = this.authService.isAdmin;
  foundUsers = this.userService.foundUsers;

  async delete() {
    try {
      const currentUsers = this.foundUsers();
      await this.userService.deleteUser(this.email);
      const updatedUsers = currentUsers.filter((user) => user?.email !== this.email);
      this.userService.foundUsers.set(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  update() {
    const dialogRef = this.dialog.open(UpdateDialogComponent, { data: { email: this.email } });
  }
}
