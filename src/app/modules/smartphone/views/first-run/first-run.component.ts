import {AfterViewInit, Component} from '@angular/core';
import {BackButtonEvent, IonRouterOutlet, Platform} from '@ionic/angular';
import {App} from '@capacitor/app';
import {SettingsServiceProvider} from '../../../../providers/settings-service.provider';
import {Router} from '@angular/router';
import {SplashScreen} from '@capacitor/splash-screen';
import RoutingService from "../../../../services/routing.service";

@Component({
  selector: 'app-first-run',
  templateUrl: './first-run.component.html',
  styleUrls: ['./first-run.component.scss']
})
export class FirstRunComponent implements AfterViewInit {
  constructor (
    private settings: SettingsServiceProvider,
    private router: Router,
    private routing: RoutingService
  ) {
  }

  ngAfterViewInit (): void {
    SplashScreen.hide ();
  }

  gotoServerSetup (): void {
    // set the first run process performed
    this.settings.instance.isFirstRunDone = true;
    this.router.navigate ([this.routing.serverSetupPath()], {replaceUrl: true});
  }
}
