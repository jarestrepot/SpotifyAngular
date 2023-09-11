import { DestroyRef, inject } from "@angular/core"
import { Subject, takeUntil } from "rxjs";

/**
 * Our destroyObservable
 * @returns callback takeUntil
 */
export const destroyObservable = () => {
  const newSubject = new Subject();
  inject(DestroyRef).onDestroy(() => {
    console.log('Se destruye el componente')
    newSubject.next(true);
    newSubject.complete();
  })

  return <T>() => takeUntil<T>(newSubject.asObservable());

}
