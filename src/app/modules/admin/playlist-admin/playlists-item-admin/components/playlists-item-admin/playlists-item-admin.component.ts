import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PlayListItem } from '../../../../../shared-types';
import { PlayListItemForm, PlayListItemService } from '../../../../../shared';

@Component({
  selector: 'app-playlists-item-admin',
  templateUrl: './playlists-item-admin.component.html',
})
export class PlaylistsItemAdminComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private itemForm: PlayListItemForm,
    @Inject('COLUMNS') public elements: any,
    private service: PlayListItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.itemForm.generate();

    this.itemForm.parseRoute(this.route);

    this.itemForm.id$.subscribe((id: number) =>
      id ? this.service.get(id) : this.service.blank()
    );

    this.service.item$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: PlayListItem) =>
        this.form.patchValue(this.itemForm.patch(item))
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  save(form: FormGroup) {
    this.service.save(this.itemForm.values(form));
    this.router.navigate(['/admin/playlist/playlists-item/list']);
  }
}
