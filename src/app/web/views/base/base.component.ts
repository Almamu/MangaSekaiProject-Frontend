import {Component} from '@angular/core';
import {AuthenticationService} from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-web-base',
  templateUrl: './base.component.html'
})
export class BaseComponent {
  constructor (private auth: AuthenticationService) { }

  get isAdmin (): boolean {
    return this.auth.validateSession () && this.auth.session.isadmin;
  }
}
