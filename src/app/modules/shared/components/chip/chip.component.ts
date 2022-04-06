import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent {
  @Input() text: string = '';
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
}
