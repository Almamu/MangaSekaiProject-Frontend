import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {IonicModule, IonicRouteStrategy, Platform} from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NetworkModule} from './modules/network/network.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AuthenticationModule} from './modules/authentication/authentication.module';
import {SwiperModule} from 'swiper/angular';
import {ReactiveFormsModule} from '@angular/forms';
import {SettingsServiceProvider} from './providers/settings-service.provider';
import {AuthenticationService} from './modules/authentication/services/authentication.service';
import {SqlSettingsService} from './services/sql-settings.service';
import {SQLite} from '@awesome-cordova-plugins/sqlite/ngx';
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx';
import RedirectComponent from './components/redirect/redirect.component';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function createTranslateLoader (http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/langs/', '.json');
}

@NgModule({
  declarations: [AppComponent, RedirectComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    NetworkModule,
    AuthenticationModule,
    ReactiveFormsModule,
    SwiperModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: APP_INITIALIZER,
      useFactory: (platform: Platform, settings: SettingsServiceProvider, auth: AuthenticationService) =>
        () => platform.ready ().then (async () => {
          if (platform.is('hybrid') === true) {
            const instance = new SqlSettingsService(platform, new SQLite(), new SQLitePorter(), auth);
            await instance.initialize();
            settings.instance = instance;
          }
        }),
      deps: [Platform, SettingsServiceProvider, AuthenticationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
