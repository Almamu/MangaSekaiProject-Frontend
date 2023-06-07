import {Injectable} from '@angular/core';
import {SettingsServiceProvider} from '../providers/settings-service.provider';

export enum AppRoutes {
  mobileBase = 'mobile',
  mobileHome = 'mobile/home',
  home = 'home',
  settings = 'settings',
  series = 'series',
  authBase = 'auth',
  login = 'login',
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

  private build (...parameters: any[]): string {
    if (this.settings.instance.isMobile)
      return `/${AppRoutes.mobileBase}/${parameters.join('/')}`;
    else
      return `${parameters.join('/')}`;
  }
}
