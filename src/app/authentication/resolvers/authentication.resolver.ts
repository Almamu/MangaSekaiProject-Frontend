import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthenticationResolver implements Resolve<void> {

  constructor (private auth: AuthenticationService, private router: Router) { }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> | Promise<void> | void {
    if (!this.auth.validateSession ())
      this.router.navigate(['auth/login']);
  }

}
