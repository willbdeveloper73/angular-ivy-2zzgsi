import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { ComponentsExport, Components } from './components';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [...Components],
  exports: [...ComponentsExport],
})
export class TableModule {}
