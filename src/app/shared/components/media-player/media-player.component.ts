import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe]
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  @ViewChild('ballProgress') progressBall: ElementRef = new ElementRef('');

  listObservables: Array<Subscription> = [];
  state:string = 'paused';
  marginBall:number = 0;


  constructor(public multiMediaService: MultimediaService){}

  ngOnInit():void {
    const observerStatus$ : Subscription = this.multiMediaService.playerStatus$.subscribe(
      {
        next: (statusTrack:string) => {
          this.state = statusTrack
        },
        error: (err: any) => {
          alert(err);
        }
      }
    );
    const observerWith$ = this.multiMediaService.playerPercentage$.subscribe(
      {
        next: (value: number) =>{
          const elNative: HTMLElement = this.progressBar.nativeElement;
          this.marginBall = this.convertPercentageToPixels(value, elNative.offsetWidth);
        },
        error: (err: any) => {
          alert(err);
        }
      }
    )

    this.listObservables = [observerStatus$, observerWith$];
  }


  ngOnDestroy(): void {
    // Recorrido para unsubscribe todos y así no guardar una pila en memoria.
    this.listObservables.forEach(observable => observable.unsubscribe());
    //   console.log('💣💣💣💣 Destroy');
  }

  handlePosition(event:MouseEvent):void {

    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event; // 100% donde damos click

    const { x, width } = elNative.getBoundingClientRect();
    const clickElementProgress = clientX - x;
    // ?? Regla de 3 para converit este valor en porcentage
    const percentage = (clickElementProgress * 100) / width;

    this.multiMediaService.setSecondTracks(percentage);

    // ** x es el tamaño en pixeles del elemento referenciado, with es el tamaño que llega hasta ahi, clickElementProgress es la resta en el que damos click y me da los pixeles donde click en el elemento.
    // console.log(`Click en ${clickElementProgress}  with:${width} x:${x} clientx: ${clientX}`);
  }

  convertPercentageToPixels(percentage: number, totalWidthInPixels: number): number {
    return (percentage / 100) * totalWidthInPixels;
  }

  handleDrag(event: DragEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event; // 100% donde damos click

    const { x, width } = elNative.getBoundingClientRect();
    const dragEnd = clientX - x;
    // ?? Regla de 3 para converit este valor en porcentage
    const percentage = (dragEnd * 100) / width;

    this.multiMediaService.setSecondTracks(percentage);
  }

  handleDragEnd(event: DragEvent): void {
    this.handleDrag(event);
  }
}
