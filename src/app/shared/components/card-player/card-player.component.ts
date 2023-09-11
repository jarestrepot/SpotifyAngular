import { Component, Input, OnInit, inject } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { ImgBrokenDirective } from '../../directives/img-broken.directive';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card-player',
    templateUrl: './card-player.component.html',
    styleUrls: ['./card-player.component.scss'],
    standalone: true,
    imports: [NgIf, ImgBrokenDirective, NgClass]
})
export class CardPlayerComponent  {

  @Input({ required:true }) mode: 'small' | 'big' = 'small';
  @Input({ required: true }) track!: TrackModel;

  private multiMediaService = inject(MultimediaService);
  private router = inject(Router);
  constructor(){}

  sendPlay(track: TrackModel):void{
    // this.multiMediaService.trackInfo$.next(track);
    //?? Metodo set para agregar valores al signal.
    this.multiMediaService.trackInfoSignal.set(track)
  }

  detailTrack(track: TrackModel):void{
    const { _id, name }  = track;
    this.router.navigate(['/', 'detail'], {
      queryParams: { id: _id }
    });
  }
}
