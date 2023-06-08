import {Injectable} from '@angular/core';
import {InstanceApiService} from '../modules/network/services/instance-api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ServerSettingModel} from '../models/server-setting.model';
import {map} from 'rxjs/operators';
import {DirectoryListModel} from '../models/directory-list.model';

const ADMINISTRATOR_USERS_KEY = 'administrator_users';
const SCANNER_DIRS = 'scanner_dirs';

@Injectable({
  providedIn: 'root'
})
export class ServerSettingsService {
  constructor (public api: InstanceApiService, public http: HttpClient) { }

  getSetting<T> (name: string): Observable<ServerSettingModel <T>> {
    const url = this.api.api ('settings');

    return this.http.get <ServerSettingModel <T>> (url + '?name=' + encodeURIComponent (name));
  }

  saveSetting (name: string, value: any): Observable<void>  {
    const url = this.api.api ('settings');

    return this.http.post<void> (url, {name, value});
  }

  getAdministratorUsers (): Observable <ServerSettingModel <number []>> {
    return this.getSetting <number []> (ADMINISTRATOR_USERS_KEY);
  }

  getScannerDirs (): Observable <ServerSettingModel <string []>> {
    return this.getSetting <string []> (SCANNER_DIRS);
  }

  saveAdministratorUsers (admins: number []): Observable <void> {
    return this.saveSetting (ADMINISTRATOR_USERS_KEY, admins);
  }

  saveScannerDirs (dirs: string []): Observable <void> {
    return this.saveSetting (SCANNER_DIRS, dirs);
  }

  listFiles (directory: string): Observable<DirectoryListModel> {
    const url = this.api.api ('files');

    return this.http.post <DirectoryListModel> (url, {directory}).pipe (
      map (x => {
        if (directory !== '/')
          x.contents.push ({name: '..', type: 'dir'});

        // sort them by name first
        x.contents = x.contents.sort ((a, b) => a.name.localeCompare (b.name));
        // sort them by type
        x.contents = x.contents.sort ((a, b) => a.type.localeCompare (b.type));

        return x;
      })
    );
  }
}
