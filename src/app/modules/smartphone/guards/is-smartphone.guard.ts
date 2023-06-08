import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {SettingsServiceProvider} from '../../../providers/settings-service.provider';

@Injectable({providedIn: 'root'})
export class IsSmartphoneGuard implements CanActivate {
  constructor (private settings: SettingsServiceProvider, private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.settings.instance.isMobile || this.router.parseUrl ('/');
  }
}
