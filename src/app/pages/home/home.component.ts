import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './options-dialog/options-dialog.component';
import { IpInfoService } from '../shared/ip-info.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButton, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly menu = inject(MenuService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly ipInfo = inject(IpInfoService);

  loggedUser = this.menu.loggedUser;

  onDeleteUser() {
    if (this.loggedUser()?.email != 'admin@email.com') {
      this.menu.deleteUser();
      this.snackBar.open('Usuário apagado.', 'Ok', { duration: 5000 });
      this.router.navigate(['auth']);
    } else {
      console.error("Cannot delete admin account!");
    }
  }

  onUpdateUser() {
    const dialogRef = this.dialog.open(UpdateDialogComponent);
  }

  onLogout() {
    console.log('logged out');
    this.menu.logout();
    localStorage.removeItem('authToken');
    this.router.navigate(['auth']);
  }

  onGetUser() {
    console.log('getting user');
    this.menu.getUser(this.loggedUser()?.email!);
  }

  onListUsers() {
    console.log('listing all users');
    this.menu.listUsers();
  }

  ngOnInit() {
    this.ipInfo.checkIp();
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['auth']);
    }
  }
}
