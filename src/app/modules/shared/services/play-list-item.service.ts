import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlayList, PlayListItem } from '../../shared-types';
import { CrudService } from './crud.service';
import { rawPlayListItems, rawPlayLists } from './rawData';

@Injectable({ providedIn: 'root' })
export class PlayListItemService extends CrudService<PlayListItem> {
  #playlists: Partial<PlayList>[] = rawPlayLists;
  _items = rawPlayListItems;

  #currentItem: BehaviorSubject<Partial<PlayListItem>> = new BehaviorSubject<
    Partial<PlayListItem>
  >(null);
  currentItem$: Observable<Partial<PlayListItem>> =
    this.#currentItem.asObservable();

  #currentItemId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  currentItemId$: Observable<number> = this.#currentItemId.asObservable();

  ascBySeq = (a: Partial<PlayListItem>, b: Partial<PlayListItem>): number => {
    return a.seq > b.seq ? 1 : a.seq < b.seq ? -1 : 0;
  };

  constructor() {
    super();
    combineLatest([this.items$, this.currentItemId$])
      .pipe(
        map(([items, currentItemId]) =>
          items?.find(
            (item: Partial<PlayListItem>) => item?.seq === currentItemId
          )
        )
      )
      .subscribe((item: Partial<PlayListItem>) => {
        if (item) this.#currentItem.next(item);
      });
  }

  getItemsForPlaylist(playlistId: number) {
    const playlist = this.#playlists.find(
      (playlist: Partial<PlayList>) => playlist?.id === playlistId
    );
    if (playlist) {
      const items: Partial<PlayListItem>[] = playlist.items;
      const sortedItems = items.sort(this.ascBySeq);
      this.items.next(sortedItems);
    }
  }

  setCurrentItemId(seqId) {
    this.#currentItemId.next(seqId);
  }
}
