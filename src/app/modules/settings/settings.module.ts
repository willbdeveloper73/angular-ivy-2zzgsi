import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared';
import { Components, ComponentsExport } from './components';

@NgModule({
  imports: [SharedModule, SettingsRoutingModule],
  declarations: [...Components],
  exports: [...ComponentsExport],
})
export class SettingsModule {}
