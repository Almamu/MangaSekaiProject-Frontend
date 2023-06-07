import {AfterViewInit, Component, ViewChild, ViewChildren} from '@angular/core';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {ServerModel} from '../../../models/server.model';
import {SettingsServiceProvider} from '../../../providers/settings-service.provider';
import {SessionModel} from '../../../authentication/models/session.model';
import {Router} from '@angular/router';
import {SplashScreen} from '@capacitor/splash-screen';
import {IonMenu} from '@ionic/angular';

@Component({
  selector: 'app-smartphone-base',
  templateUrl: './base.component.html'
})
export class BaseComponent implements AfterViewInit {
  @ViewChild('menu') menu: IonMenu;
  server: ServerModel;
  serverList: ServerModel [];
  token: SessionModel;

  constructor (
    private auth: AuthenticationService,
    private settings: SettingsServiceProvider,
    private router: Router
  ) {
    this.server = this.auth.selectedServer;
    this.serverList = this.settings.instance.serverList;
    this.token = this.auth.session;
  }

  ngAfterViewInit (): void {
    SplashScreen.hide ();
  }

  switchToServer (server: ServerModel): void {
    this.auth.selectedServer = server;
    this.server = server;
    this.token = this.auth.session;
  }

  removeServer (server: ServerModel): void {
    const isLastServer = this.serverList.length === 1;

    this.settings.instance.removeServer (server);

    // save the configuration again
    this.settings.instance.save ()
      .subscribe (res => {
        if (isLastServer) {
          // take the user to the device-setup page and reset some stuff
          this.router.navigate (['/mobile/server-setup'], {replaceUrl: true});
        } else {
          // update information
          this.serverList = this.settings.instance.serverList;
          // update selected server
          this.server = this.auth.selectedServer;
        }
      });
  }

  addServer (): void {
    this.router.navigate (['/mobile/server-setup']);
    this.menu?.close ();
  }

  gotoDashboard (): void {
    this.router.navigate (['/mobile/home'], {replaceUrl: true});
    this.menu?.close ();
  }

  gotoSettings (): void {
    this.router.navigate (['/mobile/settings'], {replaceUrl: true});
    this.menu?.close ();
  }
}
