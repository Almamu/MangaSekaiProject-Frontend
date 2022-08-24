import {Observable} from 'rxjs';
import {ServerModel} from '../models/server.model';

export enum Settings {
  firstRun = 'first-run-completed'
}

export abstract class SettingsService {
  public settings: Record<string, any> = {};

  abstract get isMobile(): boolean;

  get isFirstRunDone (): boolean {
    return !this.isMobile || this.settings [Settings.firstRun];
  }

  set isFirstRunDone (value: boolean) {
    this.settings [Settings.firstRun] = value;
  }

  abstract get serverList (): ServerModel [];
  abstract addServer (server: ServerModel): void;
  abstract removeServer (server: ServerModel): void;

  abstract save (): Observable<any>;
}
