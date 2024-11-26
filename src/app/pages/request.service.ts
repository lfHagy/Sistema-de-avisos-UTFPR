import { inject, Injectable, signal } from '@angular/core';
import { IUser } from '../core/interfaces/user';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class RequestService { // will not use this - currently just a "hub" for what I have ready
  /*token = signal<string>(''); these will be moved to their relevant spots

  private readonly http = inject(HttpClient);
  private readonly snackBar = inject(MatSnackBar);

  // registration and authentication
  async logout() {
    try {
      console.log('Attempting to log out...');
      await firstValueFrom(this.http.post(`${this.baseUrl()}/logout`, null));
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
  // update
  async updateUser(user: IUser) {
    console.log('Attempting to update user ', user.email, '...');
    try {
      const payload = { nome: user.name, senha: user.password };
      const response = await firstValueFrom(
        this.http.put(`${this.baseUrl()}/users/${user.email}`, payload, {
          observe: 'response',
        })
      );
      if (response.status === 200) {
        console.log('User updated succesfully');
        return response.body as IUser;
      } else {
        return response.status;
      }
    } catch (error) {
      console.error('Error ocurred while trying to update user ', user.email, '!', error);
    }
    return null;
  }
  // delete
  async deleteUser(email: string) {
    console.log("Attempting to delete user", email, "...")
    try {
      const response = await firstValueFrom(this.http.delete(`${this.baseUrl()}/users/${email}`, { observe: 'response' }));
      return response.status
    } catch (error) {
      console.error("Error ocurred while trying to delete user", email, "!", error);
      return 400;
    }
  }*/
}
