import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
// import * as dataT from '@data/tracks.json';

@Component({
  selector: 'app-sections-generic',
  templateUrl: './sections-generic.component.html',
  styleUrls: ['./sections-generic.component.scss']
})
export class SectionsGenericComponent implements OnInit {

  @Input() title :string = '';
  @Input() mode: 'small' | 'big' = 'big' ;
  @Input() dataTracks: Array<TrackModel> = [];


  constructor(){}
  ngOnInit() {
  }
}
