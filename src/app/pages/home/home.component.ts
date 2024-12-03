import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateDialogComponent } from './dialogs/update-dialog/update-dialog.component';
import { IpInfoService } from '../shared/ip-info.service';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { GetDialogComponent } from './dialogs/get-dialog/get-dialog.component';

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

  loggedUser = this.menu.loggedUser
  isAdmin = this.menu.isAdmin;
  selectedDialog = 0;

  onDeleteUser() {
    try {
      if (this.isAdmin()) {
        const dialogRef = this.dialog.open(DeleteDialogComponent);
      } else if (this.loggedUser()) {
        this.snackBar.open("Usuário apagado.", "Ok", { duration: 5000 });
        this.menu.deleteUser(this.loggedUser()?.email!);
        this.router.navigate(['/auth']);
      }
    } catch (error) {
      console.error("Ocorreu um erro!", error);
      this.router.navigate(['/auth']);
    }
  }

  onUpdateUser() {
    const dialogRef = this.dialog.open(UpdateDialogComponent);
  }

  onLogout() {
    this.snackBar.open("Usuário desconectado.", "Ok", { duration: 5000 });
    this.menu.logout();
    localStorage.removeItem('authToken');
    this.router.navigate(['auth']);
  }

  onGetUsers() {
    const dialogRef = this.dialog.open(GetDialogComponent);
  }

  ngOnInit() {
    this.ipInfo.checkIp();
    if (!localStorage.getItem('authToken')) {
      console.warn("No login token! Redirecting to auth...");
      this.router.navigate(['/auth']);
    }
  }
}
