import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
/**
 * Interceptro Function Session, Add Bearer token.
 * @param request
 * @param next
 * @returns
 */
export const authorizationInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  try {

    const token = inject(CookieService).get('token_service');
    let newRequest = request;
    newRequest = request.clone(
      {
        setHeaders: {
          authorization: `Bearer ${token}`,
          version_Angular: "16"
        }
      }
    );

    return next(newRequest);

  } catch (error) {

    console.log(`Error ❌❌ --> ${error}`);
    return next(request);
  }
}


