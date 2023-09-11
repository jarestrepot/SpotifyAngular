import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {  provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app/app-routes';
import { authorizationInterceptor } from '@core/interceptors/interceptor.session';


bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes, withComponentInputBinding()), // Con esta función agregamos las rutas y en este caso como app.routes contiene el principio
        importProvidersFrom(BrowserModule), // ?? Solo se importan otros modulos
        CookieService,
    provideHttpClient(withInterceptors([authorizationInterceptor]))
    ]
})
  .catch(err => console.error(err));
