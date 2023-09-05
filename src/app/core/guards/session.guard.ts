
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';


export const sessionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkCookieSession();
}

const checkCookieSession = async () => {
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
