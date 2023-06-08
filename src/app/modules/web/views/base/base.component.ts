import {Component, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import RoutingService from '../../../../services/routing.service';
import {Router} from '@angular/router';
import {IonMenu} from '@ionic/angular';

@Component({
  selector: 'app-web-base',
  templateUrl: './base.component.html'
})
export class BaseComponent {
  @ViewChild(IonMenu) menu: IonMenu;

  constructor (private auth: AuthenticationService, private routing: RoutingService, private router: Router) { }

  get isAdmin (): boolean {
    return this.auth.validateSession () && this.auth.session.isadmin;
  }

  gotoDashboard (): void {
    this.menu?.close ();
    this.router.navigate ([this.routing.homePath()], {replaceUrl: true});
  }

  gotoSettings (): void {
    this.menu?.close ();
    this.router.navigate ([this.routing.settingsPath()], {replaceUrl: true});
  }

  logout (): void {
    this.menu?.close ();
    this.router.navigate ([this.routing.logoutPath()], {replaceUrl: true});
  }
}
