import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, fromEvent, interval, Subject, takeUntil, tap, throttle } from 'rxjs';

@Component({
  selector: 'app-throttle',
  templateUrl: './throttle.component.html',
  styleUrls: ['./throttle.component.scss']
})
export class ThrottleComponent implements AfterViewInit, OnDestroy {
  @ViewChild('submitButton', { read: ElementRef }) submitButton: ElementRef | undefined;

  public clicks = fromEvent(document, 'click');
  public totalClicks$ = new BehaviorSubject(0);
  public validClicks$ = new BehaviorSubject(0);

  public destroy$ = new Subject();

  constructor() { }


  ngAfterViewInit(): void {
    const clickEvent$ = fromEvent<Event>(this.submitButton?.nativeElement, 'click').pipe(
      tap(() => this.totalClicks$.next(this.totalClicks$.value + 1)),
      throttle(() => interval(1000)),
      tap(() => this.validClicks$.next(this.validClicks$.value + 1)),
      takeUntil(this.destroy$)
    );

    clickEvent$.subscribe((x) => console.log('click!!', x));
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }


}
