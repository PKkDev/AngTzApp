import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompackToastService, TypeToast } from 'ngx-compack';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../model/post';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss']
})
export class PostContainerComponent implements OnInit, OnDestroy {
  //data
  private listPost: Post[] = [];
  public listViewPost: Post[] = [];
  public textFilter = '';
  // timeOut
  private timeOutFilter: any

  constructor(
    private apiService: ApiService,
    private cts: CompackToastService,
    private ps: PostService) { }

  ngOnInit() {
    this.ps.getPostSubs()
      .subscribe(next => {
        this.listPost = next;
        this.setTextFilter();
      })
  }

  ngOnDestroy() {
  }

  public setTextFilter() {
    if (this.timeOutFilter)
      clearTimeout(this.timeOutFilter);
    this.timeOutFilter = setTimeout(() => {
      this.listViewPost = this.listPost.filter(x => x.author.includes(this.textFilter))
    }, 1000 * 2)
  }

}
