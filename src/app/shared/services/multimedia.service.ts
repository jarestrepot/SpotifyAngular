import { EventEmitter, Injectable, effect, signal } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
// import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();
  public audioTrack!: HTMLAudioElement;

  // TODO: Tener siempre un valor el ultimo escuchado segun el usuario.
  // public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public trackInfoSignal = signal<TrackModel | undefined>(undefined);

  // public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeElapsedSignal = signal<string>('00:00');

  // public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public timeRemainingSignal = signal<string>('-00:00')

  // public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerStatusSignal = signal<string>('paused')

  // public playerPercentage$:BehaviorSubject<number> = new BehaviorSubject(0);
  public playerPercentageSignal = signal<number>(0)

  constructor() {
    this.audioTrack = new Audio();

    effect(() => {
      const dataInfo: TrackModel | undefined = this.trackInfoSignal();
      if (dataInfo) { this.setAudio(dataInfo);}
    })

    // ?? Event listener
    this.listAllEvents();
  }

  private listAllEvents(): void {
    this.audioTrack.addEventListener('timeupdate', this.calculeTime ,false);
    this.audioTrack.addEventListener('play', this.setPlayerStatus , false);
    this.audioTrack.addEventListener('playing', this.setPlayerStatus, false);
    this.audioTrack.addEventListener('ended', this.setPlayerStatus, false);
    this.audioTrack.addEventListener('pause', this.setPlayerStatus, false);
  }


  private setPlayerStatus = (status:any):void => {
    switch (status.type){
      case 'play':
        this.playerStatusSignal.set('play');
        break;
      case 'playing':
        this.playerStatusSignal.set('playing');
        break;
      case 'ended':
        this.playerStatusSignal.set('ended');
        break;
      default:
        this.playerStatusSignal.set('paused');
        break;
    }
  }

  public togglePlayer(): void {
    (this.audioTrack.paused) ? this.audioTrack.play() : this.audioTrack.pause();
  }

  private calculeTime = (): void => {
    const { duration, currentTime } = this.audioTrack;
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    let displaySeconds = (seconds < 10 ) ? `0${seconds}` : seconds;
    let displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;


    this.timeElapsedSignal.set(`${displayMinutes}:${displaySeconds}`);

  }


  private setTimeRemaining(currentTime: number, durationTotal: number){

    // Tiempo restante
    let timeLeft =  durationTotal - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);


    let displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    let displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    this.timeRemainingSignal.set(`-${displayMinutes}:${displaySeconds}`);

    // ?? Damos el valor de time con la regla de 3 tiempoTranscurrido * 100 / duracionTotal de la canción
    this.playerPercentageSignal.set((currentTime * 100) / durationTotal);
  }

  public setAudio(track: TrackModel):void {
    this.audioTrack.src = track.url;
    this.audioTrack.play();
  }

  public setSecondTracks(percentage:number):void{
    const { duration } = this.audioTrack;
    // ** Regla de 3
    this.audioTrack.currentTime = (percentage * duration) / 100;
  }
}
