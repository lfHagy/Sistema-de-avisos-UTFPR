import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  baseUrl = this.authService.baseUrl;

  async addCategory(name: string) {
    const payload = {
      nome: name
    }
    const response = await firstValueFrom(
      this.http.post(`${this.baseUrl()}/categorias`, payload)
    );
  }
}
