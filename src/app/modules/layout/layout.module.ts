import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { Components, ComponentsExport } from './components';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [...Components],
  exports: [...ComponentsExport],
})
export class LayoutModule {}
