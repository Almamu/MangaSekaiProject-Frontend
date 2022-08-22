import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-device-detector',
  templateUrl: './device-detector.component.html'
})
export class DeviceDetectorComponent implements OnInit {
  public isBrowser: boolean;

  constructor (public platform: Platform) { }

  ngOnInit (): void {
    this.isBrowser = !this.platform.is('hybrid');
  }
}
