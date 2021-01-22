import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { CompackToastService, TypeToast } from 'ngx-compack';
import { ReplaySubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../components/model/post';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy {
  // data
  private posts$: ReplaySubject<Post[]> = new ReplaySubject<Post[]>(1)
  // emiters
  private updateAllPost$: EventEmitter<boolean> = new EventEmitter();
  // private addNewPost$: EventEmitter<boolean> = new EventEmitter();
  private cancelAddNewPost$: EventEmitter<boolean> = new EventEmitter();
  // http
  private subs: Subscription | null | undefined

  constructor(
    private cts: CompackToastService,
    private apiService: ApiService) {
    moment.locale('ru');
    this.getPosts();

    this.updateAllPost$.subscribe(
      () => this.getPosts()
    );
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  public getPostSubs() {
    return this.posts$;
  }

  public getCancelAddPostEventSubs() {
    return this.cancelAddNewPost$;
  }

  public emiteUpdatePosts() {
    this.updateAllPost$.emit(true);
  }

  public emiteCancelAddPosts() {
    this.cancelAddNewPost$.emit(true);
  }

  private getPosts() {
    this.subs = this.apiService.get<Post[]>("post/list")
      .pipe(
        map(value => {
          value.forEach(x => {
            x.displayDate = moment(x.date, 'YYYY-MM-DDTHH:mm:ss').format('D MMMM HH:mm')
            x.isNew = false
          })
          return value;
        })
      )
      .subscribe(posts => {
        this.posts$.next(posts);
      },
        error => this.cts.emitNewNotif(
          { type: TypeToast.Error, title: 'Список постов', message: 'Произошла ошибка при получении списка постов' }))
  }

}
