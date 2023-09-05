import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  // TODO: Tener siempre un valor el ultimo escuchado segun el usuario.
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audioTrack!: HTMLAudioElement;
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPercentage$:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.audioTrack = new Audio();
    this.trackInfo$.subscribe(
      {
        next: (response:TrackModel) => {
          if(response) {
            // LLamamos a la función para manejar el audio.
            this.setAudio(response);
          }
          // throw new Error('Upps no ha servido el servicio ⚠️💻');
        },
        error: (error:any) => {
          alert(error.message);
        }
      }
    );

    // ?? Escuchadora de eventos
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
        this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('paused');
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


    this.timeElapsed$.next(`${displayMinutes}:${displaySeconds}`);

  }


  private setTimeRemaining(currentTime: number, durationTotal: number){

    // Tiempo restante
    let timeLeft =  durationTotal - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);


    let displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    let displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    this.timeRemaining$.next(`-${displayMinutes}:${displaySeconds}`);

    // ?? Damos el valor de time con la regla de 3 tiempoTranscurrido * 100 / duracionTotal de la canción
    this.playerPercentage$.next((currentTime * 100) / durationTotal);
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
