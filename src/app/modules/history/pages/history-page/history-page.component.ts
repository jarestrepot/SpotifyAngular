import { Component, OnInit, inject } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PlayListBodyComponent } from '../../../../shared/components/play-list-body/play-list-body.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss'],
    standalone: true,
    imports: [SearchComponent, PlayListBodyComponent, AsyncPipe]
})
export class HistoryPageComponent implements OnInit {

  listTracks: Observable<any> = new Observable<TrackModel[]>();
  searchTrack = inject(SearchService);
  ngOnInit(): void {

  }

  reciveData(event: string): void {
    if(event.length >= 1) {
      this.listTracks = this.searchTrack.searchTracks$(event);
      return;
    }
    this.listTracks = new Observable<TrackModel[]>();
  }

}
