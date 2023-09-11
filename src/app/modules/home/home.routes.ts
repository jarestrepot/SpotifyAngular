import { Routes } from '@angular/router';
import { currentUser } from '@core/utils/getCurrentUser';

export  const homeRoutes: Routes = [
  {
    path: 'tracks',
    resolve:{
      currentUser
    },
    loadChildren: () => import('@modules/tracks/tracks.routes').then(routing => routing.TracksRoutes)
  },
  {
    path: 'detail',
    loadChildren: () => import('@modules/tracks/detail.routes').then(routing => routing.TracksRoutesDetail)
  },
  {
    path: 'favorites',
    loadChildren: () => import('@modules/favorites/favorites.routes').then(routing => routing.favoritesRoutes)
  },
  {
    path: 'history',
    loadChildren: () => import('@modules/history/history.Routes').then(routing => routing.historyRoutes)
  },
  {
    path: '**', // ** 404 not found
    redirectTo: '/tracks'
  }
];

