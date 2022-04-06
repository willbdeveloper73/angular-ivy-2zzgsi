import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { ModalService } from '../../services';

@Component({
  selector: 'app-right-side-modal',
  templateUrl: './right-side-modal.component.html',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)',
        })
      ),
      transition('in => out', animate('1s ease-in-out')),
      transition('out => in', animate('1s ease-in-out')),
    ]),
  ],
})
export class RightSideModalComponent implements OnInit {
  @ViewChild('Modal', { static: false }) modal: ElementRef;
  elem: HTMLElement;
  menuState: string = 'in';

  constructor(public modalService: ModalService) {}

  ngOnInit() {
    this.modalService.open$.subscribe((open: boolean) =>
      open ? this.openModal() : this.onClose()
    );
  }

  ngAfterViewInit(): void {
    this.elem = this.modal.nativeElement as HTMLElement;
  }

  openModal(): void {
    if (this.elem) {
      this.elem.classList.remove('hidden');
      this.elem.classList.add('visible');
      this.elem.style.width = '100vw';
      this.menuState = 'in';
    }
  }

  onClose(): void {
    if (this.elem) {
      this.menuState = 'out';
      this.elem.classList.remove('visible');
      this.elem.classList.add('hidden');

      setTimeout(() => {
        this.elem.style.width = '0';
      }, 75);
    }
  }
}
