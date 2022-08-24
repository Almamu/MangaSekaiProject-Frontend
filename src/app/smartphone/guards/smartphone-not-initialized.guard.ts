import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {SettingsServiceProvider} from '../../providers/settings-service.provider';

@Injectable({providedIn: 'root'})
export class SmartphoneNotInitializedGuard implements CanActivate {
  constructor (private settings: SettingsServiceProvider, private router: Router) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.settings.instance.isFirstRunDone || this.router.parseUrl ('/mobile/home');
  }
}
