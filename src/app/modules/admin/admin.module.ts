import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { AdminRoutingModule } from './admin-routing.module';
import { Components, ComponentsExport } from './components';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule, AdminRoutingModule],
  declarations: [...Components],
  exports: [...ComponentsExport],
})
export class AdminModule {}
