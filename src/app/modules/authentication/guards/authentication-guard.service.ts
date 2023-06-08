import {ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {Injectable} from '@angular/core';
import RoutingService from '../../../services/routing.service';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate {

  constructor (private auth: AuthenticationService, private router: Router, private routing: RoutingService) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.validateSession () || this.router.parseUrl (this.routing.loginPath ());
  }

}
