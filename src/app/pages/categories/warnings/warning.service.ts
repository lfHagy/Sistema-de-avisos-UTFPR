import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { IWarning } from '../../../core/interfaces/warning';
import { CategoriesService } from '../categories.service';

@Injectable({
  providedIn: 'root'
})
export class WarningService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  baseUrl = this.authService.baseUrl;
  foundWarnings = signal<IWarning[]>([]);

  async createWarning(warningText: string, categoryId: number) {
    const payload = {
      "idCategoria": categoryId,
      "descricao": warningText
    }
    await firstValueFrom(this.http.post(`${this.baseUrl()}/avisos`, payload));
    await this.getWarnings(categoryId);
  }

  async getWarnings(categoryId: number) {
    this.foundWarnings.set([]);
    console.log("trying to fetch");
    try {
      this.foundWarnings.set(await firstValueFrom(this.http.get<IWarning[]>(`${this.baseUrl()}/avisos/${categoryId}`)));
      console.log(this.foundWarnings());
    } catch (error) {
      this.foundWarnings.set([]);
      console.error("could not fetch warnings!", error);
    }
  }

  async updateWarning(warningText: string, warningId: number, categoryId: number) {
    const payload = {
      "descricao": warningText
    }
    await firstValueFrom(this.http.put(`${this.baseUrl()}/avisos/${warningId}`, payload));
    await this.getWarnings(categoryId);
  }

  async deleteWarning(warningId: number, categoryId: number) {
    await firstValueFrom(this.http.delete(`${this.baseUrl()}/avisos/${warningId}`));
    await this.getWarnings(categoryId);
  }
}
