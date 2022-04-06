import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsListComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: SettingsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
