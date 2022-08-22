import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SettingsServiceProvider} from '../../providers/settings-service.provider';

@Injectable({providedIn: 'root'})
export class SmartphoneNotInitializedGuard implements CanActivate {
  constructor (private settings: SettingsServiceProvider) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.settings.instance.isFirstRunDone;
  }
}
