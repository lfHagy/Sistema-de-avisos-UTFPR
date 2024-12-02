import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../../core/interfaces/user';
import { IpInfoService } from '../shared/ip-info.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly http = inject(HttpClient);
  private readonly ipInfo = inject(IpInfoService);
  private readonly authService = inject(AuthService);

  baseUrl = this.ipInfo.baseUrlSignal;
  loggedUser = this.authService.loggedUser;

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
    console.log('Attempting to update current user...');
    try {
      const payload = {
        nome: user.name,
        senha: user.password,
      };
      const response = await firstValueFrom(
        this.http.put(
          `${this.baseUrl()}/usuarios/${user.email}`,
          payload,
          {
            observe: 'response',
          }
        )
      );
      if (response.status === 200) {
        console.log('User updated succesfully');
      } else {
        return response.status;
      }
    } catch (error) {
      console.error(
        'Error ocurred while trying to update user ',
        this.loggedUser()?.email,
        '!',
        error
      );
    }
    return null;
  }
  // delete
  async deleteUser() {
    console.log('Attempting to delete current user...');
    try {
      if (this.loggedUser()) {
        const response = await firstValueFrom(
          this.http.delete(
            `${this.baseUrl()}/usuarios/${this.loggedUser()?.email}`,
            { observe: 'response' }
          )
        );
      }
    } catch (error) {
      console.error(
        'Error ocurred while trying to delete user',
        this.loggedUser()?.email,
        '!',
        error
      );
    }
  }
  // get
  async getUser(email: string) {
    console.log('Attempting to get user...');
    await firstValueFrom(this.http.get(
            `${this.baseUrl()}/usuarios/${email}`));
  }

  async listUsers() {
    console.log('Attempting to list all users...');
    await firstValueFrom(this.http.get(`${this.baseUrl()}/usuarios`))
  }
}
