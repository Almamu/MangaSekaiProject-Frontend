import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoaderService} from '../services/loader.service';
import {finalize} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable ()
export class LoaderInterceptor implements HttpInterceptor {
  constructor (private loader: LoaderService) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.increaseReferences ();

    return next.handle (req).pipe (
      finalize(() => this.loader.decrementReferences ())
    );
  }

}
