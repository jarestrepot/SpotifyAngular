import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
// import { TracksModule } from '@modules/tracks/tracks.module';
// import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = [];
  tracksReverse: Array<TrackModel> = [];
  // listObserves$: Array<Subscription> = [];

  constructor(private trackService: TrackService){
  }

  ngOnInit(): void {
    this.getAllTracks();

    this.getReverseTracks();
    // this.listObserves$ = [subcriptionTracks$, subcriptionReverseTracks$];
  }

  async getRandomTracks(): Promise<TrackModel[]>{
    return await this.trackService.getAllRandom$().toPromise();
  }

  getAllTracks(): void{
    this.trackService.getAllTracks$().subscribe(
      (response: TrackModel[]) => {
        this.tracksTrending = response;
      }
    );
  }

  getReverseTracks(): void{
    this.trackService.getAllReverse$().subscribe(
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
  ngOnDestroy(): void {
    // this.listObserves$.forEach(observer => observer.unsubscribe());
  }
}
