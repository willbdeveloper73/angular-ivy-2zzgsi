import { BaseName } from './base-name.interface';
import { Course } from './course.interface';
import { PlayList } from './play-list.interface';
import { PlayListItem } from './play-list-item.interface';
import { PlayListSource } from './play-list-source.interface';
import { User } from './user.interface';
import { Watched } from './watched.interface';

export interface Player extends BaseName {
  courseId?: number;
  userId?: number;
  playlistId?: number;
  playlistItemId?: number;
  sourceId?: number;
  watched: Partial<Watched>[];
  autoplay?: boolean;

  courseWatched?: boolean;

  course?: Partial<Course>;
  user?: Partial<User>;
  playlist?: Partial<PlayList>;
  playlistItems?: Partial<PlayListItem>[];
  playlistItem?: Partial<PlayListItem>;
  source?: Partial<PlayListSource>;
}
