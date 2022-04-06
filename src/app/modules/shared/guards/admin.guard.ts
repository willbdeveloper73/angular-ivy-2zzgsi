import { Injectable } from '@angular/core';
import {
  Route,
  Router,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthenticatedUserService } from '../services/authenticated-user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard
  implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad
{
  stop$ = new Subject<boolean>();

  constructor(private user: AuthenticatedUserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  navigateHome(): boolean {
    this.router.navigate(['/']);
    return false;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    let result: boolean;
    // console.log('route:', route);
    this.user.item$.pipe(takeUntil(this.stop$)).subscribe((user) => {
      const allowed = route?.data?.roles?.map((requiredRole) => {
        // console.log('checking roles:', {
        //   user: user?.roles,
        //   requiredRole: route?.data?.roles,
        // });
        return user?.roles.some((role) => role.name === requiredRole);
      })[0];

      if (allowed) {
        result = true;
      } else {
        result = this.navigateHome();
      }
    });
    // console.log('checkUserLogin:', result);
    return result;
  }
}
