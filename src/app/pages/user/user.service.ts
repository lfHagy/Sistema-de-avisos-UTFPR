import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../../core/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/services/auth.service';
import { IpInfoService } from '../shared/services/ip-info.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly ipInfo = inject(IpInfoService);
  private readonly authService = inject(AuthService);

  baseUrl = this.ipInfo.baseUrlSignal;
  loggedUser = this.authService.loggedUser;
  isAdmin = this.authService.isAdmin;
  foundUsers = signal(<Partial<IUser[]>>[]);

  async updateUser(user: IUser) {
    console.log('Attempting to update current user...');
    try {
      const payload = {
        nome: user.name,
        senha: user.password,
      };
      const response = await firstValueFrom(
        this.http.put(`${this.baseUrl()}/usuarios/${user.email}`, payload, { observe: 'response' }));
      if (response.status === 200) {
        console.log('User updated succesfully');
      }
      return response;
    } catch (error) {
      console.error('Error ocurred while trying to update user ', this.loggedUser()?.email, '!', error);
      return null;
    }
  }

  async deleteUser(email: string) {
    console.log('Attempting to delete user...');
    try {
      const response = await firstValueFrom(this.http.delete(`${this.baseUrl()}/usuarios/${email}`, { observe: 'response' }));
      return response;
    } catch (error) {
      console.error('Error ocurred while trying to delete user', this.loggedUser()?.email, '!', error);
      return null;
    }
  }

  async getUser(email: string): Promise<IUser> {
    const response = await firstValueFrom(this.http.get(`${this.baseUrl()}/usuarios/${email}`));
    const user = {
      ...response,
      name: (response as any).nome,
      password: (response as any).senha
    };
    return user as IUser;
  }  

  async listUsers() {
    console.log('Attempting to list all users...');
    try {
      const response = await firstValueFrom(this.http.get(`${this.baseUrl()}/usuarios`)) as any[];
      const users: IUser[] = response.map((user) => ({
        name: user.nome,
        email: user.email,
        password: user.password,
        admin: user.admin,
      }));
      console.log('Users fetched:', users);
      this.foundUsers.set(users);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }
  

  async logout() {
    try {
      console.log('Attempting to log out...');
      await firstValueFrom(this.http.post(`${this.baseUrl()}/logout`, null));
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
