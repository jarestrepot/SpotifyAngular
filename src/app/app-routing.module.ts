import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sessionGuard } from '@core/guards/session.guard';
import { HomePagesComponent } from '@modules/home/pages/home-pages/home-pages.component';

const routes: Routes = [
  {
    path: 'auth', // ** Modulo de autentificación
    loadChildren: () => import(`./modules/auth/auth.module`).then(module => module.AuthModule) // Carga perezosa del modulo (lazy loading)
  },
  {
    path: '' ,// ?? hace referencia al localhost:4200
    component: HomePagesComponent,
    loadChildren: () => import(`./modules/home/home.module`).then(module => module.HomeModule),
    canActivate:[
      sessionGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
