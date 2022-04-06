import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { combineLatest, BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  PlayListItem,
  User,
  Watched,
} from '../../../shared-types';
import {
  AuthenticatedUserService,
  CourseService,
  PlayerService,
  PlayListItemService,
} from '../../../shared';

@Component({
  selector: 'app-player-meta',
  templateUrl: './player-meta.component.html',
})
export class PlayerMetaComponent implements OnInit, OnDestroy {
  @Input() autoPlay: boolean = true;
  // @Output() autoPlayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  lessonsWatched: number = 0;
  numberOfLessons: number = 0;
  progress: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    // public serviceCourse: CourseService,
    // public servicePlayListItem: PlayListItemService,

    public playerService: PlayerService,

    public authenticatedUser: AuthenticatedUserService
  ) {}

  percentProgress(): string {
    return `${this.progress}%`;
  }

  ngOnInit() {
    this.playerService.item$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item) => {
        this.lessonsWatched = item.watched.length || 0;
        this.numberOfLessons = item.playlistItems.length;
        this.autoPlay = item.autoplay;
        this.progress = (this.lessonsWatched / this.numberOfLessons) * 100;
      });
    // combineLatest([
    //   this.authenticatedUser.courseItemsWatched$,
    //   this.serviceCourse.item$,
    //   this.servicePlayListItem.items$,
    // ])
    //   .pipe(
    //     map(([watched, course, items]) => {
    //       this.lessonsWatched = watched?.length || 0;
    //       this.numberOfLessons = items?.length;
    //       this.progress = (this.lessonsWatched / this.numberOfLessons) * 100;
    //     }),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  toggleAutoPlay() {
    this.autoPlay = !this.autoPlay;
    // this.autoPlayChange.emit(this.autoPlay);
  }
}
