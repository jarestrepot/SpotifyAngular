import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { OrderListPipe } from '../../pipes/order-list.pipe';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';
import { NgFor, NgTemplateOutlet } from '@angular/common';
// import * as dataRaw from '@data/tracks.json';


@Component({
    selector: 'app-play-list-body',
    templateUrl: './play-list-body.component.html',
    styleUrls: ['./play-list-body.component.scss'],
    standalone: true,
    imports: [NgFor, NgTemplateOutlet, ImgBrokenDirective, OrderListPipe]
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
