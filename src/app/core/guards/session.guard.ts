
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';


export const checkCookieSessionGuard = async (): Promise<Boolean> => {
  try {
    // Inyección de dependencias
    const cookieToken:string = inject(AuthService).getToken();

    if (!cookieToken){
      return await inject(Router).navigate(['auth/login']);
    }

    return true;

  } catch (error) {
    alert(`Algo sucedio!! ❌ ${error}`);
    return false;

  }
}
