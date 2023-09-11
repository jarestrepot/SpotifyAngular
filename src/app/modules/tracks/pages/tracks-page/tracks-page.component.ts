import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
// import { TrackService } from '@modules/tracks/services/track.service';
import { SectionsGenericComponent } from '../../../../shared/components/sections-generic/sections-generic.component';
import { getAllReverse$, getAllTracks$ } from '@modules/tracks/services/trackController.service';
import { CurrentUserModel } from '@core/models/currentUser';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-tracks-page',
    templateUrl: './tracks-page.component.html',
    styleUrls: ['./tracks-page.component.scss'],
    standalone: true,
    imports: [SectionsGenericComponent, CommonModule]
})
export class TracksPageComponent {

  @Input() currentUser: CurrentUserModel | any ;

  tracksTrending: Array<TrackModel> = [];
  tracksReverse: Array<TrackModel> = [];

  constructor(){

    getAllTracks$().subscribe(
      (response: TrackModel[]) => {
        this.tracksTrending = response;
      });

    getAllReverse$().subscribe(
        {
          next: (response: TrackModel[]) => {
            this.tracksReverse = response;
          },
          error: (error: Error) => {
            // console.log(error);
          },
          complete: () => {
            // console.log("complete");
          }
        }
      );


  }
}
