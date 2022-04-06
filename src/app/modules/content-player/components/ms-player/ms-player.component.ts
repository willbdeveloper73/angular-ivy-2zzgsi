import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Player,
  PlayListSource,
  Watched,
} from '../../../shared-types';
import {
  PlayerService,
  WatchedService,
} from '../../../shared';

@Component({
  selector: 'app-ms-player',
  templateUrl: './ms-player.component.html',
})
export class MsPlayerComponent implements OnInit, OnDestroy {
  doc: string = '';
  item: Partial<Player> = {};

  destroy$: Subject<boolean> = new Subject<boolean>();

  displayCheckbox: boolean = true;

  constructor(
    public playerService: PlayerService,
    public watchedService: WatchedService
  ) {}

  ngOnInit(): void {
    this.playerService.item$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: Partial<Player>) => (this.item = item));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  acknowledge() {
    const maxSource = this.item?.playlistItem?.sources.reduce((p, c) =>
      p?.seq > c?.seq ? p : c
    );
    const lessonCompleted = this.item.sourceId === maxSource?.seq;
    if (lessonCompleted) {
      const watched: Partial<Watched> = {
        id: null,
        userId: this.item?.userId,
        courseId: this.item?.courseId,
        itemId: this.item?.playlistItemId,
        watched: true,
      };
      this.watchedService.save(watched);
      if (
        this.item?.playlistItem?.seq !==
        this.item.playlistItems[this.item.playlistItems?.length - 1]?.seq
      ) {
        this.playerService.setPlaylistItemId(this.item?.playlistItem?.seq + 1);
      }
    } else {
      this.playerService.setPlaylistSourceId(this.item?.sourceId + 1);
    }
  }
}
