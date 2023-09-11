import { Component,  Input,  inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-detail-track',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-track.component.html',
  styleUrls: ['./detail-track.component.scss']
})
export class DetailTrackComponent{
  @Input({required: true})tracKDetail!: TrackModel;
  constructor(){

  }
}
