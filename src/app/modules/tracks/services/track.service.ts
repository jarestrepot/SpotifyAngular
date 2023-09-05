import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { enviroment } from '@environments/enviroment';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  // Tuberia de información de los tracks que estara observando todo el tiempo gracias rxjs
  // dataTracksTrending$: Observable<TrackModel[]> = of([]);
  // dataTracksRandom$: Observable<TrackModel[]> = of([]);

  private readonly URL = enviroment.api;

  constructor(private http: HttpClient) {}
  /**
   *
   * @returns Devuelve todas las canciones! 😎🤘🏽
   */
  getAllTracks$():Observable<TrackModel[]>{
    return this.http.get<TrackModel[]>(`${this.URL}/tracks`).pipe(
      map(({ data }: any)=> {
        return data
      }),
      catchError((error) => {
        // Ejecutamos alguna acción
        return of([]);
      })
    );
  }

  /**
   *
   * @returns Devuelve todas las canciones en reversa! 😎🤘🏽
   */
  getAllReverse$(): Observable<TrackModel[]> {
    return this.http.get<TrackModel[]>(`${this.URL}/tracks`).pipe(
      map(({ data }: any) => {
        return data.reverse();
      }),
      catchError((error) => {
        // Ejecutamos alguna acción
        return of([]);
      })
    );
  }

  /**
   * Función de promesa para aplicar el filtro de la canción omitida
   * @param listTrack Todas las canciones
   * @param id de la canción que no se mostrara
   * @returns Todos las canciones a excepción de la excluida.
   */
  private skipByID(listTrack: TrackModel[], id:number):Promise<TrackModel[]> {
    return new Promise<TrackModel[]>((resolve, reject) => {
      const lisTmp = listTrack.filter(track => track._id !== id);
      resolve(lisTmp);
    });
  }

  /**
  *
  * @returns Devuelve todas las canciones en reversa omitiendo una especifico! 😎🤘🏽
  */
  getAllRandom$(): Observable<any> {
    return this.http.get<TrackModel[]>(`${this.URL}/tracks`).pipe(
      mergeMap(({ data }: any) => this.skipByID(data, 1)),
      catchError((err) => {
        // Trasavilidad de los error y enviar un log de tracking al grupo de mantenimiento
        const { status, statusText } = err;
        return of([]) // Aca creamos un observable con of([])
      })
    );
  }

}
