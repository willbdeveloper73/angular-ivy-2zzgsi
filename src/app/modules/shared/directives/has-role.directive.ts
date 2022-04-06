import { Component } from '@angular/core';
import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticatedUserService } from '../services/authenticated-user.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the roles passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *appHasAnyRole="'ROLE_VALUE'">...</some-element>
 *
 *     <some-element *appHasAnyRole="['ROLE_VALUE_1', 'ROLE_VALUE_2']">...</some-element>
 * ```
 */
@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input() appHasRole: string;

  stop$ = new Subject<boolean>();

  isVisible = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private user: AuthenticatedUserService
  ) {}

  ngOnInit() {
    //  We subscribe to the roles$ to know the roles the user has
    this.user.item$.pipe(takeUntil(this.stop$)).subscribe((user) => {
      // If he doesn't have any roles, we clear the viewContainerRef
      if (!user.roles) {
        this.viewContainerRef.clear();
      }

      const permissionCheck = user.roles.some(
        (role) => role.name === this.appHasRole
      );
      // If the user has the role needed to
      // render this component we can add it
      if (permissionCheck) {
        // If it is already visible (which can happen if
        // his roles changed) we do not need to add it a second time
        if (!this.isVisible) {
          // We update the `isVisible` property and add the
          // templateRef to the view using the
          // 'createEmbeddedView' method of the viewContainerRef
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        // If the user does not have the role,
        // we update the `isVisible` property and clear
        // the contents of the viewContainerRef
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    });
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next(true);
  }
}
