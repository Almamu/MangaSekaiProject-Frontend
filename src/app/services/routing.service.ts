import {Injectable} from '@angular/core';
import {SettingsServiceProvider} from '../providers/settings-service.provider';

export enum AppRoutes {
  webBase = 'web',
  mobile = 'mobile',
  home = 'home',
  settings = 'settings',
  series = 'series',
  auth = 'auth',
  login = 'login',
  logout = 'logout',
  firstRun = 'first-run',
  serverSetup = 'server-setup',
  chapter = 'chapter'
}

@Injectable({
  providedIn: 'root'
})
export default class RoutingService {
  constructor (private settings: SettingsServiceProvider) {}

  homePath (): string {
    return this.build (AppRoutes.home);
  }

  seriesPath (id: number): string {
    return this.build (AppRoutes.home, AppRoutes.series, id);
  }

  chapterPath (mangaId: number, chapterId: number): string {
    return this.build (AppRoutes.home, AppRoutes.series, mangaId, AppRoutes.chapter, chapterId);
  }

  loginPath (): string {
    return this.build (AppRoutes.auth, AppRoutes.login);
  }

  logoutPath (): string {
    return this.build (AppRoutes.auth, AppRoutes.logout);
  }

  firstRunPath (): string {
    return this.build (AppRoutes.firstRun);
  }

  serverSetupPath (): string {
    return this.build (AppRoutes.serverSetup);
  }

  settingsPath (): string {
    return this.build (AppRoutes.settings);
  }

  private build (...parameters: any[]): string {
    if (this.settings.instance.isMobile)
      return `/${AppRoutes.mobile}/${parameters.join('/')}`;
    else
      return `/${AppRoutes.webBase}/${parameters.join('/')}`;
  }
}
