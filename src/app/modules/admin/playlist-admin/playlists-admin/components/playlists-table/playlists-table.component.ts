import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayList } from '../../../../../shared-types';
import { PlayListService } from '../../../../../shared';

@Component({
  selector: 'app-playlists-table',
  templateUrl: './playlists-table.component.html',
})
export class PlaylistsTableComponent implements OnInit {
  constructor(
    public service: PlayListService,
    @Inject('COLUMNS') public columns: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.get();
  }

  add() {
    this.router.navigate(['/admin/playlist/playlists/add']);
  }

  edit($event: Partial<PlayList>) {
    this.router.navigate(['/admin/playlist/playlists/edit', $event.id]);
  }

  delete($event: Partial<PlayList>) {
    this.service.remove($event);
  }
}
