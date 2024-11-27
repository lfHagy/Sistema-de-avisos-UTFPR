import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IUser } from '../../core/interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  loggedUser = signal<Partial<IUser | null>>(null);
  baseUrl = localStorage.getItem("baseUrl");
  
  async register(user: IUser) {
    console.log('Attempting to register...');
    const payload = {
      nome: user.name,
      email: user.email,
      senha: user.password,
    };
    try {
      const response = await firstValueFrom(
        this.http.post(`${this.baseUrl}/usuarios`, payload, {
          observe: 'response',
        })
      );
      console.log('Server responded with ', response);
        return response.status;
    } catch (error) {
      console.error('Error ocurred while registering!', error);
      return 400;
    }
  }

  async login(user: IUser) {
    console.log(`${this.baseUrl}/login`)
    console.log('Attempting to login...');
    try {
      const payload = {
        email: user.email,
        senha: user.password as string,
      };
      const response = await firstValueFrom(this.http.post<{ token: string }>(`${this.baseUrl}/login`, payload, { observe: 'response' }));
        if (response.status === 200) {
          const token = response.body?.token;
          if (token) {
            localStorage.setItem('authToken', token);
            console.log('Token stored in localStorage');
            this.loggedUser.set(payload);
            console.log("Logged user set: ", this.loggedUser());
          } else {
            console.error("Logged in but no token received!");
            return 400;
          }
          return null;
      } else {
        return response.status;
      }
    } catch (error) {
      console.error('Error ocurred while trying to log in!', error);
      return 400;
    }
  }

  checkResponse(status: number): string { // todo - improve this to offer better feedback
    switch (status) { // currently just using this to make things work
      case 200:
        return '200 - Operação realizada com sucesso.';
      case 201:
        return '201 - Recurso criado com sucesso.';
      case 400:
        return '400 - Dados inválidos!';
      case 401:
        return '401 - Você não tem autorização para realizar essa operação.';
      case 403:
        return '403 - Ação proibida.';
      case 404:
        return '404 - Recurso não encontrado.';
      case 409:
        return '409 - Esse recurso já existe.';
      case 500:
        return '500 - Erro de servidor. Tente novamente mais tarde.';
      default:
        return `Erro inesperado: ${status}`;
    }
  }
}
