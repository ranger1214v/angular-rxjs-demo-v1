import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, BehaviorSubject, shareReplay, fromEvent } from 'rxjs';

interface APIData {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ScrollComponent implements AfterViewInit {
  @ViewChild('messageListBox', { static: true }) messageListBox: ElementRef | undefined;

  public query$ = this.http.get<APIData[]>('https://jsonplaceholder.typicode.com/todos/');
  public index$ = new BehaviorSubject(20);
  public showItems$ = this.index$.pipe(
    shareReplay(1),
  );

  constructor(public http: HttpClient) { }

  ngAfterViewInit(): void {
    this.initLazyLoadList();
  }

  initLazyLoadList() {
    if (this.messageListBox?.nativeElement) {
      const scroll = fromEvent<Event>(this.messageListBox.nativeElement, 'scroll');
      scroll.pipe(debounceTime(375)).subscribe((ele) => {
        const messageListBoxEle = ele.target as HTMLElement;
        if (messageListBoxEle.scrollHeight - messageListBoxEle.scrollTop <= messageListBoxEle.clientHeight + 100) {
          this.index$.next(this.index$.value + 10);
        }
      });
    }
  }


}
