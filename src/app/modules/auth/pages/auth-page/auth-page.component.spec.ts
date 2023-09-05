import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthPageComponent } from './auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AuthPageComponent Testing 👻', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AuthPageComponent]
    });
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ** METHOD AAA
  it('The form should return invalid', () => {
    // Arrange(Arranque)
    const mockEmail = {
      email: 'foo@example.com',
      password: 'password'
    }
    // Act (Actuar)
    const emailForm: any = component.formLogin.get('email');
    const passwordForm: any = component.formLogin.get('password');
    emailForm.setValue(mockEmail.email);
    passwordForm.setValue(mockEmail.password);
    // Assert (Afirmar)
    expect(component.formLogin.invalid).toEqual(true);
  });


  it('The form should return valid', () => {
    // Arrange(Arranque)
    const mockEmail = {
      email: 'test@test.com',
      password: 'Aplicaciones01'
    }
    // Act (Actuar)
    const emailForm: any = component.formLogin.get('email');
    const passwordForm: any = component.formLogin.get('password');
    emailForm.setValue(mockEmail.email);
    passwordForm.setValue(mockEmail.password);
    // Assert (Afirmar)
    expect(component.formLogin.valid).toEqual(true);
  });

  it('The button should have the word log in 👌', () => {
    // Forma para acceder a los elementos del DOM lo hacemos con todas esta acciones
    const elementRef = fixture.debugElement.query(By.css('.form-action button'));
    const getInnnerText = elementRef.nativeElement.innerText;
    expect(getInnnerText).toEqual('Iniciar sesión');
  });

  it('The login button must be green 🤘🏽💚', () => {
    // Forma para acceder a los elementos del DOM lo hacemos con todas esta acciones
    const elementRef = fixture.debugElement.query(By.css('.form-action button'));
    const getBackgroundColor = getComputedStyle(elementRef.nativeElement).backgroundColor;
    expect(getBackgroundColor).toEqual('rgb(29, 185, 84)');
  });


});
