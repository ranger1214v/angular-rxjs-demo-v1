import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, tap, timer } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnDestroy {
  public source$ = new Subject(); // Subject(觀察目標) , 也是 Observable(可被觀察的物件) , 但是它可以被觀察者訂閱 , 並且可以發送訊息給觀察者

  public timer$: any;

  constructor() {}
  ngOnDestroy(): void {
    console.log('ngOnDestroy!!');
    this.timer$.unsubscribe();
  }

  ngOnInit(): void {
    const observer = {
      // Observer(觀察者)
      next: (data: any) => console.log('觀察者 next', data),
      error: (err: any) => console.error(err),
      complete: () => console.log('觀察者 結束了'),
    };

    const sourceChild$ = this.source$.pipe(
      tap((data) => console.log('tap =>', data)) // Operators(運算子)
    );

    const subscription = sourceChild$.subscribe(observer); // Subscription(訂閱物件)

    this.source$.next('Hello World'); // 會執行 observer 的 next 方法
    this.source$.next('Hello World2');
    this.source$.complete(); // 會執行 observer 的 complete 方法
    this.source$.next('Hello World3');

    subscription.unsubscribe(); // 取消訂閱

    this.timer$ = timer(0, 1000).subscribe((i) => console.log('new', i));
  }
}
