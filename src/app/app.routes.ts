import { Routes } from '@angular/router';
import { Layout } from './_core/layout/layout';
import { LoginComponent } from './pages/login/login-component';
import { authGuard } from './_core/auth.guard';

export const appRoutes: Routes = [
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'english',
                pathMatch: 'full'
            },
               {
                path: 'english',
                loadComponent: () => import('./pages/english/english-page').then(c => c.EnglishPage)
            },
            {
                path: 'svenska',
                loadComponent: () => import('./pages/svenska/svenska-page').then(c => c.SvenskaPage)
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
