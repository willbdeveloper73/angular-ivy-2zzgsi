import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayListItem } from '../../../../../shared-types';
import { PlayListItemService } from '../../../../../shared';

@Component({
  selector: 'app-playlists-item-table',
  templateUrl: './playlists-item-table.component.html',
})
export class PlaylistsItemTableComponent implements OnInit {
  constructor(
    public service: PlayListItemService,
    @Inject('COLUMNS') public columns: any,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.get();
  }

  add() {
    this.router.navigate(['/admin/playlist/playlists-item/add']);
  }

  edit($event: Partial<PlayListItem>) {
    this.router.navigate(['/admin/playlist/playlists-item/edit', $event.id]);
  }

  delete(item: Partial<PlayListItem>) {
    this.service.remove(item);
  }
}
