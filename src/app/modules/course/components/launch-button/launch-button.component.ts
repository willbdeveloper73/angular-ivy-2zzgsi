import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-launch-button',
  templateUrl: './launch-button.component.html',
})
export class LaunchButtonComponent {
  @Input() button_text = 'Launch';
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
}
