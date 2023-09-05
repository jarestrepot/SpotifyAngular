import { Component, ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken.directive';
import { ComponentFixture, TestBed,  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


// Crear el componente de prueba
@Component({
  template: '<img appImgBroken class="test-imgBroken" [src]="srcMock" >'
})
class TesteComponent {
  public srcMock = undefined;
}


describe('Directive IMAGEN BROKEN 🧷', () => {

  let component: TesteComponent;
  // Nos ayuda a obtener los methodos necesarios para poder interactuar a nivel de testing con todas las propiedades de este componente.
  // Necesitamos saber valores del HTML
  let fixture:ComponentFixture<TesteComponent>;
  // Declaramos los valores que vamos a utilizar en el Test
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [TesteComponent, ImgBrokenDirective]
    })

    fixture = TestBed.createComponent(TesteComponent);
    component = fixture.componentInstance;
    // Debemos decirle a los test que detecten los cambios.
    fixture.detectChanges();
  })

  it('should create an instance', () => {
    const mockElement = new ElementRef('')
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });
  // Esperamos el que componente creado exista.
  it('It should install correctly', () => {
    expect(component).toBeTruthy()
  });

  it('Directive should change to a default image if the src is wrong', (done:DoneFn) => {
    // ARRANGE
    const beforeElementImg = fixture.debugElement.query(By.css('.test-imgBroken')).nativeElement;
    const beforeImgSrc = beforeElementImg.src;
    component.srcMock = undefined;
    setTimeout(() => {
      const afterElementImg = fixture.debugElement.query(By.css('.test-imgBroken')).nativeElement;
      const afterImgSrc = afterElementImg.src;

      expect(afterImgSrc).toContain('/assets/images/img-broken-request.jpg');
      done();
    }, 3000)
  });
});
