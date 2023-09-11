import { Routes } from '@angular/router';
import { FavoriteComponent } from './pages/favorite/favorite.component';


export const favoritesRoutes: Routes = [
  {
    path: '',
    component: FavoriteComponent,
    outlet: 'child'
  }
];

