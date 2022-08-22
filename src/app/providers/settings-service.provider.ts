import {Injectable} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {WebSettingsService} from '../services/web-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsServiceProvider {
  public instance: SettingsService;

  constructor (placeholder: WebSettingsService) {
    this.instance = placeholder;
  }

}
