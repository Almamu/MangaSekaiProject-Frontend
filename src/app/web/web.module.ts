import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../components/components.module';
import {NgModule} from '@angular/core';
import {BaseComponent} from './base/base.component';

@NgModule ({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule
  ],
  exports: [BaseComponent],
  declarations: [BaseComponent]
})
export class WebModule { }
