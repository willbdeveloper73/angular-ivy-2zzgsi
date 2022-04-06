import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Input() toggle: boolean = false;
  @Input() bg_color: string = 'bg-app-secondary';
  @Input() text_color: string = 'text-app-secondary';

  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  switch() {
    this.toggle = !this.toggle;
    this.toggleChange.emit(this.toggle);
  }
}
