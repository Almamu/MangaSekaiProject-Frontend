import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './interceptors/authentication.interceptor';
import {LoginComponent} from './views/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IsNotSmartphoneGuard} from '../smartphone/guards/is-not-smartphone.guard';
import {AppRoutes} from '../services/routing.service';

export const routes: Routes = [
  {
    path: AppRoutes.login,
    component: LoginComponent,
    canActivate: [IsNotSmartphoneGuard]
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
  declarations: [LoginComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
  ]
})
export class AuthenticationModule { }
