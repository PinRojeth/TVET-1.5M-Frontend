import { ChangeDetectorRef, Injectable, OnDestroy, ViewRef, inject } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class Unsubscribe implements OnDestroy {
  unsubscribe$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export const DESTROYER$ = () => {
  const destroy$ = new Subject<void>();
  const viewRef = inject(ChangeDetectorRef) as ViewRef;
  viewRef.onDestroy(() => {
    destroy$.next();
    destroy$.complete();
  });
  return destroy$;
};
