import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiTracks, TrackModelApi } from '@core/models/tracksApi.model';
import { enviroment } from '@environments/enviroment';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = enviroment.api;
  constructor(private http: HttpClient) { }

  searchTracks$(term: string): Observable<ApiTracks[]> {
    // Pasamo el valor como un query string
    const dataArrayTacks: Array<any> = []
    return this.http.get<ApiTracks[]>(`${this.URL}/tracks?src=${term}`).pipe(
      map((data:any) => {
        data.data.find((track: any) => {
          if (track.name.includes(term) || track.album.includes(term) || track.artist.name.includes(term) || track.gender.includes(term)){
            dataArrayTacks.push(track);
          }
        });
        return dataArrayTacks;
      }),
      catchError((error: any) => {
        // ** Mandar un correo al slack
        return of([]);
      })
    )
  }
}
