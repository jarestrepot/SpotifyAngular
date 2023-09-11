import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { DetailTrackComponent } from '@shared/components/detail-track/detail-track.component';
import { getTracksId$, getAllReverse$ } from '@modules/tracks/services/trackController.service';
import { TrackModel } from '@core/models/tracks.model';
import { destroyObservable } from '@core/utils/destroyCustomObservable';
import { filter, find } from 'rxjs';

@Component({
  selector: 'app-detailPage-track',
  standalone: true,
  templateUrl: './detail-track.component.html',
  styleUrls: ['./detail-track.component.scss'],
  imports: [CommonModule, DetailTrackComponent]
})
export class DetailPageTrackComponent {

  private idTrack!: number;
  private routeGet = inject(ActivatedRoute)
  customDestroyRef = destroyObservable();
  track!: TrackModel;

  constructor() {
    this.routeGet.queryParams.subscribe({
      next: (params: Params) => {
        this.idTrack = parseInt(params['id'])
      },
      error: (err: Error) => console.error(err)
    });

    getTracksId$(this.idTrack)
    .pipe(
      this.customDestroyRef()
    )
    .subscribe(
      {
        next: (response: TrackModel) => {
          this.track = response;
        },
        error: (err: Error) => console.error('ERROR ',err)
      }
    )
  }
}
