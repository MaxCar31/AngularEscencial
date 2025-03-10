import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },

  {
    path: 'country',
    //Lazy loading sirve para cargar los modulos de manera asincrona y no cargar todo el proyecto al inicio
    loadChildren: () => import('./country/country.routes'),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
