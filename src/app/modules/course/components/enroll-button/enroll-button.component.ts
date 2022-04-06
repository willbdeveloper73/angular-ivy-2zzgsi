import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-enroll-button',
  templateUrl: './enroll-button.component.html',
})
export class EnrollButtonComponent {
  @Input() button_text = 'Assign';
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
}
