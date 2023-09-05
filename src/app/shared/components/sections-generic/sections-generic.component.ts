import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { CardPlayerComponent } from '../card-player/card-player.component';
import { NgClass, NgFor } from '@angular/common';
// import * as dataT from '@data/tracks.json';

@Component({
    selector: 'app-sections-generic',
    templateUrl: './sections-generic.component.html',
    styleUrls: ['./sections-generic.component.scss'],
    standalone: true,
    imports: [NgClass, NgFor, CardPlayerComponent]
})
export class SectionsGenericComponent implements OnInit {

  @Input() title :string = '';
  @Input() mode: 'small' | 'big' = 'big' ;
  @Input() dataTracks: Array<TrackModel> = [];


  constructor(){}
  ngOnInit() {
  }
}
