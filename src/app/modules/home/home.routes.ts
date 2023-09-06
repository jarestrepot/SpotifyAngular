import { Routes } from '@angular/router';

export  const homeRoutes: Routes = [
  {
    path: 'tracks',
    loadChildren: () => import('@modules/tracks/tracks.routes').then(routing => routing.TracksRoutes)
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

