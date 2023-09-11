
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { ApiTracks } from '@core/models/tracksApi.model';
import { enviroment } from '@environments/enviroment';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, mergeMap, of, filter, find } from 'rxjs';

const URL = enviroment.api;
/**
 *  Function Http inejct
 * @returns All Songs 😎🤘🏽
 */
export const getAllTracks$ = (): Observable < TrackModel[] > => {
  // inject in the request.
  return inject(HttpClient).get<TrackModel[]>(`${URL}/tracks`).pipe(
    map(({ data }: any) => {
      return data
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
const skipByID = (listTrack: TrackModel[], id: number): Promise < TrackModel[] > =>  {

  return new Promise<TrackModel[]>((resolve, reject) => {
    const lisTmp = listTrack.filter(track => track._id !== id);
    resolve(lisTmp);
  });

}

/**
*
* @returns Devuelve todas las canciones en reversa omitiendo una especifico! 😎🤘🏽
*/
export const  getAllRandom$ = (): Observable < any > => {

  return inject(HttpClient).get<TrackModel[]>(`${URL}/tracks`).pipe(
    mergeMap(({ data }: any) => skipByID(data, 1)),
    catchError((err) => {
      // Trasavilidad de los error y enviar un log de tracking al grupo de mantenimiento
      const { status, statusText } = err;
      return of([]) // Aca creamos un observable con of([])
    })
  );

}

/**
 *
 * @returns Devuelve todas las canciones en reversa! 😎🤘🏽
 */
export const getAllReverse$ = (): Observable < TrackModel[] > => {

  return inject(HttpClient).get<TrackModel[]>(`${URL}/tracks`).pipe(
    map(({ data }: any) => {
      return data.reverse();
    }),
    catchError((error) => {
      // Ejecutamos alguna acción
      return of([]);
    })
  );

}


export const getCurrentUser = (): string => {
  return inject(CookieService).get('token_service')
}


export const getTracksId$ = (trackId: number): Observable<TrackModel> => {

  let dataTracks!: TrackModel ;
  return inject(HttpClient).get<TrackModel>(`${URL}/tracks`).pipe(
    map((data:any) => {
      data.data.find((track:any) => {
        if(track._id === trackId) {
          // dataTracks.push(track);
          dataTracks = track;
        }
      });
      return dataTracks;
    }),
    catchError((error) => {
      return of();
    })
  )

}
