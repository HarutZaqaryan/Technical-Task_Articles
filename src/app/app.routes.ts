import { Routes } from '@angular/router';
import { UserPageComponent } from './Components/user-page/user-page.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./Components/admin-page/admin-page.component').then(
        (mod) => mod.AdminPageComponent
      ),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./Components/user-page/user-page.component').then(
        (mod) => mod.UserPageComponent
      ),
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
