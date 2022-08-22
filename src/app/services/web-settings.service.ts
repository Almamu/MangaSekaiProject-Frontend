import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SQLite} from '@awesome-cordova-plugins/sqlite/ngx';
import {SQLiteObject} from '@awesome-cordova-plugins/sqlite';
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx';
import {forkJoin, Observable, of} from 'rxjs';
import {Settings, SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class WebSettingsService extends SettingsService {
  isMobile (): boolean {
    return false;
  }

  /**
   * Stores all the settings into the database
   * @private
   */
  save (): Observable <any> {
    return of (true);
  }
}
