import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../model/post';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  // input config
  @Input() postData: Post | undefined

  constructor() { }

  ngOnInit() {
    console.log(this.postData);
  }

}
