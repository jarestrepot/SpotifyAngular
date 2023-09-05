import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { returnedUserModel } from '@core/models/userLogin.model';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf]
})
export class AuthPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});
  errorSession:Boolean = false;
  errorMessage:String =  '';
  constructor(private authService: AuthService, private cookie:CookieService, private router:Router){}

  ngOnInit(): void {
    this.checkToken();
    this.formLogin = new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$')
        ])
    });
  }

  sendLogin():void{
    const { email, password } = this.formLogin.value;
    this.authService.sendCredencials(email, password)
    .subscribe({
      next: (result: returnedUserModel) => {
        this.checkToken();
      },
      error:(err) => {
        // TODO: Modal, alerta
        this.errorSession = true;
        this.errorMessage = err.error.error;
      }
    });
  }


  async checkToken():Promise<void>{
    const token = this.cookie.check('token_service');
    if(token){
      await this.router.navigate(['/tracks']);
      return;
    }
    this.router.navigate(['/auth']);
  }
}
