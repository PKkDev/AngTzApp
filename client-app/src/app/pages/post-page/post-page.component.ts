import { Component, OnInit } from '@angular/core';
import { ResizeService } from 'src/app/services/resize.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  // view
  public isHidden = true;
  public viewWidth = window.innerWidth;

  constructor(
    private rs: ResizeService
  ) {
    rs.getResizeEvent().subscribe((value: number) => {
      this.viewWidth = value;
      if (value < 965)
        this.isHidden = true;
    });
  }

  ngOnInit() {
  }

}
