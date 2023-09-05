import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() imagenDefault: string | null = null;
  @HostListener('error') handleError(): void {
    // Escuchamos el error del elemento y podemos manejar sus atributos.
    const elNative = this.elHost.nativeElement;
    // elNative.style.display = 'none';
    // elNative.src = '../../../assets/images/img-broken-request.jpg';
    elNative.src = this.imagenDefault ?? '../../../assets/images/img-broken-request.jpg';
  }
  constructor(private elHost: ElementRef) { }

}
