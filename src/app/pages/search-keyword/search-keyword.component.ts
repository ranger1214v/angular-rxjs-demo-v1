import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, merge, Subject, switchMap, tap } from 'rxjs';

interface APIData {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}


@Component({
  selector: 'app-search-keyword',
  templateUrl: './search-keyword.component.html',
  styleUrls: ['./search-keyword.component.scss']
})
export class SearchKeywordComponent implements OnInit {
  public keyword$ = new BehaviorSubject<string>('');

  public action$ = this.keyword$.pipe(
    filter((keyword) => keyword.length >= 3 || keyword.length === 0),
    debounceTime(300),
    distinctUntilChanged(),
  );

  public query$ = this.action$.pipe(
    switchMap(() => this.http.get<APIData[]>('https://jsonplaceholder.typicode.com/todos/')),
  );

  public filterList$ = this.query$.pipe(
    map(list => list.filter(item => item.title.includes(this.keyword$.value))),
  );

  public loading$ = merge(this.action$, this.query$).pipe(
    map((data) => typeof data === 'string'),
  );

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.keyword$.next('');
  }

}
