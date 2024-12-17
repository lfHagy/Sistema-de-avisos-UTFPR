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
    await this.findCategories();
  }

  async findCategories() {
    const response = await firstValueFrom(
      this.http.get<{ nome: string; id: number }[]>(`${this.baseUrl()}/categorias`)
    );

    const transformedCategories = response.map(category => ({
      id: category.id,
      name: category.nome,
    }));
    console.log(transformedCategories);

    this.foundCategories.set(transformedCategories as ICategory[]);
  }

  async updateCategory(id: number, payload: object) {
    await firstValueFrom(this.http.put(`${this.baseUrl()}/categorias/${id}`, payload));
    await this.findCategories();
    await this.refreshSelectedCategory(this.selectedCategory()!.id);
  }

  async deleteCategory(id: number) {
    await firstValueFrom(this.http.delete(`${this.baseUrl()}/categorias/${id}`));
    await this.findCategories();
    this.selectedCategory.set(null);
  }

  async refreshSelectedCategory(id: number) {
    const selectedCategory = this.foundCategories().find(category => category.id === id);

    if (selectedCategory) {
      this.selectedCategory.set(selectedCategory);
    } else {
      console.warn(`Category with ID ${id} not found.`);
    }
  }
}