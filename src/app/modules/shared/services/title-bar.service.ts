import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TitleBarService {
  title: string = '';
  #title: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  title$: Observable<string> = this.#title.asObservable();

  setTitle(title) {
    this.title = title;
    this.#title.next(title);
  }
  getTitle() {
    return this.title;
  }
}
