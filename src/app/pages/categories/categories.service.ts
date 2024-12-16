import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { ICategory } from '../../core/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  baseUrl = this.authService.baseUrl;
  foundCategories = signal<ICategory[]>([]);
  selectedCategory = signal<ICategory | null>(null);

  async addCategory(name: string) {
    const payload = {
      nome: name
    }
    const response = await firstValueFrom(
      this.http.post(`${this.baseUrl()}/categorias`, payload)
    );
  }

  async findCategories() {
    const response = await firstValueFrom(
      this.http.get<{ nome: string; id: number }[]>(`${this.baseUrl()}/categorias`)
    );
  
    const transformedCategories = response.map(category => ({
      id: category.id,
      name: category.nome,
    }));
  
    this.foundCategories.set(transformedCategories as ICategory[]);
  }

  async updateCategory() {
    console.log('todo');
  }

  async deleteCategory(id: number) {
    console.log('todo');
  }
}
