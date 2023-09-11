
import { inject } from "@angular/core"

import { CookieService } from "ngx-cookie-service"

export const currentUser =  (): { [key: string]: string }  => {

  const cookieServiceToken = inject(CookieService).get('token_service') as string;

  return { email: 'jarestrepot@uqvirtual.edu.co', id: '1', role: 'admin', token: cookieServiceToken   }
}
