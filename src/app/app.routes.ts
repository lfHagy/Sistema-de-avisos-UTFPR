import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { IpSelectionComponent } from './pages/ip-selection/ip-selection.component';

export const routes: Routes = [
    {
        path: '',
        component: IpSelectionComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
