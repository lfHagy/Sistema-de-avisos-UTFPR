import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { IpSelectionComponent } from './pages/ip-selection/ip-selection.component';
import { UserComponent } from './pages/user/user.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'ip',
        component: IpSelectionComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'categories',
        component: CategoriesComponent
    }
];
