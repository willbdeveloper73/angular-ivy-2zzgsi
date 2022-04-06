import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { Components, ComponentsExport } from './components';

@NgModule({
  imports: [CommonModule, NgxDocViewerModule],
  declarations: [...Components],
  exports: [...ComponentsExport],
})
export class ContentPlayerModule {}
