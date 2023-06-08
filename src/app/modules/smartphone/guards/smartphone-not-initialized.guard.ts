import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {SettingsServiceProvider} from '../../../providers/settings-service.provider';
import RoutingService from '../../../services/routing.service';

@Injectable({providedIn: 'root'})
export class SmartphoneNotInitializedGuard implements CanActivate {
  constructor (private settings: SettingsServiceProvider, private router: Router, private routing: RoutingService) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.settings.instance.isFirstRunDone || this.router.parseUrl (this.routing.homePath());
  }
}
