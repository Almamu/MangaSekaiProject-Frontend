import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../core/components.module';
import {AuthenticationGuard} from '../authentication/guards/authentication-guard.service';
import {SettingsPage} from './settings/settings.page';
import {DiscoveryModal} from './settings/discovery-modal/discovery.modal';
import {CreateUserModal} from './settings/create-user-modal/create-user.modal';
import {EditUserModal} from './settings/edit-user-modal/edit-user.modal';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ComponentsModule
  ],
  exports: [RouterModule],
  declarations: [SettingsPage, DiscoveryModal, EditUserModal, CreateUserModal]
})
export class SettingsPageModule {}
