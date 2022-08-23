import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SQLite} from '@awesome-cordova-plugins/sqlite/ngx';
import {SQLiteObject} from '@awesome-cordova-plugins/sqlite';
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx';
import {forkJoin, Observable, of} from 'rxjs';
import {Settings, SettingsService} from './settings.service';
import {ServerModel} from "../models/server.model";

@Injectable({
  providedIn: 'root'
})
export class WebSettingsService extends SettingsService {
  get isMobile (): boolean {
    return false;
  }

  get serverList (): ServerModel [] {
    return [{address: '', token: '', alias: '', selected: true}];
  }
  addServer (server: ServerModel): void {}
  removeServer (server: ServerModel): void {}

  /**
   * Stores all the settings into the database
   * @private
   */
  save (): Observable <any> {
    return of (true);
  }
}
