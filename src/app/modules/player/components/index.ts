import { PlayComponent } from './play';
import { PlayerComponent } from './player';
import { PlayerItemComponent } from './player-item';
import { PlayerMetaComponent } from './player-meta';
import { WatchedComponent } from './watched';

export const ComponentsExport = [PlayerComponent];

export const Components = [
  ...ComponentsExport,
  PlayComponent,
  PlayerItemComponent,
  PlayerMetaComponent,
  WatchedComponent,
];

export * from './player';
export * from './player-item';
export * from './player-meta';
