import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable ()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor (private authentication: AuthenticationService, private router: Router) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authentication.validateSession () === true && req.headers.has ('Authorization') === false) {
      req = req.clone ({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${this.authentication.session.token}`
        }
      });
    }

    return next.handle (req).pipe (
      catchError (err => {
        if (err.status === 401) {
          // ensure the session data is destroyed as the server says it is not valid
          this.authentication.destroy ();
          // take the user to the main page, as it decides where the user should land
          this.router.navigate (['/']);
        }

        return throwError (err);
      })
    );
  }
}
