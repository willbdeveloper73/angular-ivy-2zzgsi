import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PlayListSource } from '../../../../../shared-types';
import { PlayListSourceForm, PlayListSourceService } from '../../../../../shared';

@Component({
  selector: 'app-playlists-source-admin',
  templateUrl: './playlists-source-admin.component.html',
})
export class PlaylistsSourceAdminComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private playlistSourceForm: PlayListSourceForm,
    @Inject('COLUMNS') public elements: any,
    private service: PlayListSourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.playlistSourceForm.generate();

    this.playlistSourceForm.parseRoute(this.route);

    this.playlistSourceForm.id$.subscribe((id: number) =>
      id ? this.service.get(id) : this.service.blank()
    );

    this.service.item$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: PlayListSource) =>
        this.form.patchValue(this.playlistSourceForm.patch(item))
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async save(form: FormGroup) {
    this.service.save(this.playlistSourceForm.values(form));
    this.router.navigate(['/admin/playlist/list']);
  }
}
