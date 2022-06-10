import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, shareReplay, switchMap } from 'rxjs';

interface APIData {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

@Component({
  selector: 'app-cache-api',
  templateUrl: './cache-api.component.html',
  styleUrls: ['./cache-api.component.scss']
})
export class CacheApiComponent implements OnInit {

  public show$ = new BehaviorSubject(false);

  public refresh$ = new BehaviorSubject(null);
  public queryList$ = this.refresh$.pipe(
    switchMap(() => this.http.get<APIData[]>('https://jsonplaceholder.typicode.com/todos/')),
    shareReplay(1)
  );

  constructor(public http: HttpClient) { }

  ngOnInit(): void {}

  refresh() {
    this.refresh$.next(null);
  }

}
