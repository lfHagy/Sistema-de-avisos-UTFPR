import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../../../core/interfaces/user';
import { IpInfoService } from './ip-info.service';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly ipInfo = inject(IpInfoService);
  loggedUser = signal<Partial<IUser | null>>(null);
  isAdmin = signal<boolean>(false);
  baseUrl = this.ipInfo.baseUrlSignal;

  async register(user: IUser) {
    console.log('Attempting to register...');
    const payload = {
      nome: user.name,
      email: user.email,
      senha: user.password,
    };
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl()}/usuarios`, payload, { observe: 'response' })
      );
      console.log('Server responded with ', response);
      return response.status;
    } catch (error) {
      console.error('Error ocurred while registering!', error);
      return null;
    }
  }

  async login(user: IUser) {
    console.log(`${this.baseUrl()}/login`)
    console.log('Attempting to login...');
    try {
      const payload = {
        email: user.email,
        senha: user.password as string,
      };
      const response = await firstValueFrom(this.http.post<{ token: string }>(`${this.baseUrl()}/login`, payload, { observe: 'response' }));
      if (response.status === 200) {
        const token = response.body?.token;
        if (token) {
          localStorage.setItem('authToken', token);
          console.log('Token stored in localStorage');
          this.loggedUser.set(payload);
          console.log("Logged user set: ", this.loggedUser());
          this.isAdmin.set(this.checkAdmin());
          return 200;
        } else {
          console.error("Logged in but no token received!");
          return 400;
        }
      } else {
        return response.status;
      }
    } catch (error) {
      console.error('Error ocurred while trying to log in!', error);
      return 400;
    }
  }

  private checkAdmin(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log(decoded);
        const isAdmin = decoded?.admin;
        return isAdmin !== undefined ? isAdmin : false;
      } catch (error) {
        console.error('Error decoding the token:', error);
        return false;
      }
    }
    return false;
  }
  
}
