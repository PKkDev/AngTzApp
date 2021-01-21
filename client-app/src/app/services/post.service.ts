import { Injectable, OnDestroy } from '@angular/core';
import { CompackToastService, TypeToast } from 'ngx-compack';
import { ReplaySubject, Subscription } from 'rxjs';
import { Post } from '../components/model/post';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService implements OnDestroy {
  // data
  private posts$: ReplaySubject<Post[]> = new ReplaySubject<Post[]>(1)
  // http
  private subs: Subscription | null | undefined

  constructor(
    private cts: CompackToastService,
    private apiService: ApiService) {
    this.getPosts();
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  public getPostSubs() {
    return this.posts$;
  }

  private getPosts() {
    this.subs = this.apiService.get<Post[]>("post/list")
      .subscribe(posts => {
        this.posts$.next(posts);
      },
        error => this.cts.emitNewNotif(
          { type: TypeToast.Error, title: 'Список постов', message: 'Произошла ошибка при получении списка постов' }))
  }

}
