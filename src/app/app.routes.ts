import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'visa-form',
        loadComponent: () => import('./pages/visa-form/visa-form.component').then(m => m.VisaFormComponent)
    },
];
