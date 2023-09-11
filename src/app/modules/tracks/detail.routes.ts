import { Routes } from '@angular/router';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';
import { DetailPageTrackComponent } from './pages/detail-track/detail-track.component';

export const TracksRoutesDetail: Routes = [
  {
    path: '',
    component: DetailPageTrackComponent,
    outlet: 'child'
  }
];
