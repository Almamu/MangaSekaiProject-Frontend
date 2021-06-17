import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationInterceptor} from './interceptors/authentication.interceptor';
import {LoginComponent} from './views/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
