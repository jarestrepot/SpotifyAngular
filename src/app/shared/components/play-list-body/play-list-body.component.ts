import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
// import * as dataRaw from '@data/tracks.json';


@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.scss']
})
export class PlayListBodyComponent implements OnInit, OnDestroy {

  @Input() tracks: Array<TrackModel> = [];
  optionProperties:{property: string | null, sort: string } = {property : null, sort: 'asc'};
  constructor(){};

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }
  changeProperty(property: string){
    // Capturamos el valor del sort.
    const { sort } = this.optionProperties;
    this.optionProperties = {
      property,
      sort: sort === 'asc' ? 'desc' : 'asc'
    }
  }

}
