import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { IpSelectionComponent } from './pages/ip-selection/ip-selection.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];
