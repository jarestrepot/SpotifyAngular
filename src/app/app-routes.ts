
import { Routes } from '@angular/router';
import { checkCookieSessionGuard } from '@core/guards/session.guard';
// import { sessionGuard } from '@core/guards/session.guard';
import { HomePagesComponent } from '@modules/home/pages/home-pages/home-pages.component';

export const appRoutes: Routes = [
  {
    path: 'auth', // ** Modulo de autentificación
    loadChildren: () => import(`./modules/auth/auth-routes`).then(routing => routing.authRoutes) // Carga perezosa del modulo (lazy loading)
  },
  {
    path: '' ,// ?? hace referencia al localhost:4200
    component: HomePagesComponent,
    loadChildren: () => import(`./modules/home/home.routes`).then(routing => routing.homeRoutes),
    canActivate:[
      checkCookieSessionGuard
    ]
  }
];
