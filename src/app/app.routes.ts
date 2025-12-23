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
                redirectTo: 'learn',
                pathMatch: 'full'
            },
            {
                path: 'learn',
                loadComponent: () => import('./pages/learn/learn-component').then(c => c.Learn)
            },  
            {
                path: 'library',
                loadComponent: () => import('./pages/library/library-component').then(c => c.LibraryComponent)
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
