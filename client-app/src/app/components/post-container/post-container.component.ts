import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
    public authService: AuthService,
    private ps: PostService) {
  }

  ngOnInit() {

    this.ps.getPostSubs()
      .subscribe(next => {
        this.listPost = next;
        this.setTextFilter();
      })

    this.ps.getCancelAddPostEventSubs()
      .subscribe(() => {
        this.listPost.shift();
        this.setTextFilter();
      });

    // this.ps.getAddPostEventSubs()
    //   .subscribe(() => {
    //     if (this.listPost.find(x => x.isNew) == null) {
    //       this.listPost.unshift({ author: '', date: null, displayDate: '', edited: false, id: -1, text: '', isNew: true, fileDescDto: [] });
    //       this.setTextFilter();
    //     }
    //   })
  }

  ngOnDestroy() {
  }


  public emiteAddPost() {
    if (this.listPost.find(x => x.isNew) == null) {
      this.listPost.unshift({ author: '', date: null, displayDate: '', edited: false, id: -1, text: '', isNew: true, fileDescDto: [] });
      this.setTextFilter();
    }
  }

  public setTextFilter() {
    if (this.timeOutFilter)
      clearTimeout(this.timeOutFilter);
    this.timeOutFilter = setTimeout(() => {
      this.listViewPost = this.listPost.filter(x => x.author.includes(this.textFilter) || x.isNew)
    }, 1000 * 2)
  }

}
