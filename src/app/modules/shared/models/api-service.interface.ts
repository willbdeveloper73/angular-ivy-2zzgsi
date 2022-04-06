import { BehaviorSubject, Observable } from 'rxjs';
import { BaseName } from './base-name.interface';

export interface ApiService<T> {
  items$: Observable<Partial<T>[]>;
  item$: Observable<Partial<T>>;

  blank(): void;
  get(id?: number): void;
  remove(item: Partial<T>): void;
  save(item: Partial<T>): void;
}
