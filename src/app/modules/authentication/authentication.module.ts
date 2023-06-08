import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './interceptors/authentication.interceptor';
import {LoginComponent} from './views/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IsNotSmartphoneGuard} from '../web/guards/is-not-smartphone.guard';
import {AppRoutes} from '../../services/routing.service';
import LogoutComponent from './views/logout/logout.component';
import {AuthenticationGuard} from './guards/authentication-guard.service';

export const routes: Routes = [
  {
    path: AppRoutes.login,
    component: LoginComponent,
    canActivate: [IsNotSmartphoneGuard]
  },
  {
    path: AppRoutes.logout,
    component: LogoutComponent,
    canActivate: [IsNotSmartphoneGuard, AuthenticationGuard]
  }
];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      HttpClientModule,
      RouterModule.forChild(routes),
      TranslateModule
  ],
  exports: [RouterModule],
  declarations: [LoginComponent, LogoutComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ]
})
export class AuthenticationModule { }
