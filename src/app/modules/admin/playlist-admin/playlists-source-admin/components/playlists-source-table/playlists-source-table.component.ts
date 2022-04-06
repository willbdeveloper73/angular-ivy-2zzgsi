import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayListSource } from '../../../../../shared-types';
import { PlayListSourceService } from '../../../../../shared';

@Component({
  selector: 'app-playlists-source-table',
  templateUrl: './playlists-source-table.component.html',
})
export class PlaylistsSourceTableComponent implements OnInit {
  constructor(
    public service: PlayListSourceService,
    @Inject('COLUMNS') public columns: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.get();
  }

  add() {
    this.router.navigate(['/admin/playlist/playlists-source/add']);
  }

  edit($event: Partial<PlayListSource>) {
    this.router.navigate(['/admin/playlist/playlists-source/edit', $event.id]);
  }

  delete(item: Partial<PlayListSource>) {
    this.service.remove(item);
  }
}
