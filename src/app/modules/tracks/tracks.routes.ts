import {  Routes } from '@angular/router';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';
import { DetailPageTrackComponent } from './pages/detail-track/detail-track.component';

export const TracksRoutes: Routes = [
  {
    path: '',
    component: TracksPageComponent,
    outlet: 'child'
  },
  {
    path: 'detail',
    component: DetailPageTrackComponent,
    outlet: 'child',

  }
];
