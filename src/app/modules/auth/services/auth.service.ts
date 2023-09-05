import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '@environments/enviroment';
import { returnedUserModel, userLoginModel } from '@core/models/userLogin.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = enviroment.api;
  constructor(private httpClient: HttpClient, private cookie:CookieService) { }

  sendCredencials(email: string, password: string): Observable<returnedUserModel>{
    const body: userLoginModel = {
      email, password
    };
    return this.httpClient.post<returnedUserModel>(
      `${this.URL}/auth/login`,
      body // Pasando el parametro que necesita en post.
    ).pipe(
      tap((response: any) => {
        const { tokenSession, data } = response;
        this.cookie.set('token_service', tokenSession, 4, '/');
      }),
      catchError((error)=>{
        console.log(error); // Enviar el error al stack
        return of()
      })
    );
  }


  getToken(): string {
    return this.cookie.get('token_service');
  }

}
