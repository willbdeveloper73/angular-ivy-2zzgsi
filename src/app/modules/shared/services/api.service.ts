// Import the core angular services.
import { forwardRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { PaginationService } from './pagination.service';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// By using an ABSTRACT CLASS as the dependency-injection (DI) token, it allows us to
// use the class as both the token and as an INTERFACE that the concrete classes have to
// implement. And, by including the "useClass" property in our decorator, it allows us
// to define the DEFAULT IMPLEMENTATION to be used with this injection token.
@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => UserService), // Default implementation.
})
export abstract class ApiService<T> extends PaginationService {
  // protected abstract _items: Partial<T>[];

  protected items: BehaviorSubject<Partial<T>[]> = new BehaviorSubject<
    Partial<T>[]
  >(null);
  public abstract items$: Observable<Partial<T>[]>;

  protected abstract item: BehaviorSubject<Partial<T>>;
  public abstract item$: Observable<Partial<T>>;

  protected abstract getNextId(): number;

  abstract blank(): void;

  abstract get(id?: number): void;

  abstract filterOutOriginal(item: Partial<T>): Partial<T>[];

  abstract remove(item: Partial<T>): void;

  abstract save(item: Partial<T>): void;
}
