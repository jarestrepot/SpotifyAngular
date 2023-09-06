import {  Routes } from '@angular/router';
import { TracksPageComponent } from './pages/tracks-page/tracks-page.component';

export const TracksRoutes: Routes = [
  {
    path: '',
    component: TracksPageComponent,
    outlet: 'child'
  }
];
