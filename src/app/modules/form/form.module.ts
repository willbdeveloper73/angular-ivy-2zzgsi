import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestorInfoElements } from '../shared-types';
import { Components, ComponentsExport } from './components';

const ModulesExport = [FormsModule, ReactiveFormsModule];
@NgModule({
  imports: [CommonModule, ...ModulesExport],
  declarations: [...Components],
  exports: [...ModulesExport, ...ComponentsExport],
  providers: [
    {
      provide: 'COLUMNS',
      useValue: () => {
        return RequestorInfoElements;
      },
    },
  ],
})
export class FormModule {}
