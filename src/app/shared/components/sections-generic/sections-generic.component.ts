import { Component, Input, OnInit, inject } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { CardPlayerComponent } from '../card-player/card-player.component';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ActivatedRoute, Routes } from '@angular/router';
// import * as dataT from '@data/tracks.json';

@Component({
    selector: 'app-sections-generic',
    templateUrl: './sections-generic.component.html',
    styleUrls: ['./sections-generic.component.scss'],
    standalone: true,
    imports: [NgClass, NgFor, CardPlayerComponent, CommonModule]
})
export class SectionsGenericComponent implements OnInit {


  @Input() title :string = '';
  @Input() mode: 'small' | 'big' = 'big' ;
  @Input() dataTracks: Array<TrackModel> = [];
  // routerTrackDetail = inject(Routes);
  constructor(){
  }

  ngOnInit() {
  }

}
