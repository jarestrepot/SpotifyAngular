import { Component, DestroyRef, ElementRef, OnDestroy, OnInit, ViewChild, effect, inject } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';
// import { Subscription } from 'rxjs';
import { NgTemplateOutlet, NgIf, NgClass, AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { destroyObservable } from '@core/utils/destroyCustomObservable';

@Component({
    selector: 'app-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, NgIf, NgClass, AsyncPipe]
})
export class MediaPlayerComponent  {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  @ViewChild('ballProgress') progressBall: ElementRef = new ElementRef('');

  state:string = 'paused';
  marginBall:number = 0;
  destroyRef = inject(DestroyRef);
  customDestroyRef = destroyObservable();

  public multiMediaService  = inject(MultimediaService)

  constructor(){

    effect(()=>{
      const state = this.multiMediaService.playerStatusSignal();
      this.state = state;
    })

    effect(()=>{
      const playerPercenteage = this.multiMediaService.playerPercentageSignal()
      const elNative: HTMLElement = this.progressBar.nativeElement;
      this.marginBall = this.convertPercentageToPixels(playerPercenteage, elNative.offsetWidth);
    })
    // this.multiMediaService.playerStatus$
    //   .pipe(
    //     // takeUntilDestroyed(this.destroyRef)
    //     this.customDestroyRef()
    //   )
    //   .subscribe(
    //     {
    //       next: (statusTrack: string) => {
    //         this.state = statusTrack
    //       },
    //       error: (err: any) => {
    //         alert(err);
    //       }
    //     }
    //   );



    // this.multiMediaService.playerPercentage$
    //   .pipe(
    //     // takeUntilDestroyed(this.destroyRef)
    //     this.customDestroyRef()
    //   )
    //   .subscribe(
    //     {
    //       next: (value: number) => {
    //         const elNative: HTMLElement = this.progressBar.nativeElement;
    //         this.marginBall = this.convertPercentageToPixels(value, elNative.offsetWidth);
    //       },
    //       error: (err: any) => {
    //         alert(err);
    //       }
    //     }
    //   )
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


