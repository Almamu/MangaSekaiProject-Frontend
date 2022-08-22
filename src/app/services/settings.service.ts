import {Observable} from 'rxjs';

export enum Settings {
  firstRun = 'first-run-completed'
}

export abstract class SettingsService {
  protected settings: Record<string, any> = {};

  abstract isMobile(): boolean;

  get isFirstRunDone (): boolean {
    return !this.isMobile () || this.settings [Settings.firstRun];
  }

  set isFirstRunDone (value: boolean) {
    this.settings [Settings.firstRun] = value;
  }

  abstract save (): Observable<any>;
}
