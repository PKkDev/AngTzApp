import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompackToastService, TypeToast } from 'ngx-compack';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit, OnDestroy {
  // data
  public countPost = 0;
  // http
  private subs: Subscription | null | undefined

  constructor(
    private apiService: ApiService,
    private cts: CompackToastService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCountPost();
  }

  ngOnDestroy() {
    if (this.subs)
      this.subs.unsubscribe();
  }

  public openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      height: 'auto',
      width: 'auto'
    });

  }

  private getCountPost() {
    this.subs = this.apiService.get<number>("post/count")
      .subscribe(next => this.countPost = next,
        error => this.cts.emitNewNotif(
          { type: TypeToast.Error, title: 'Количество постов', message: 'Произошла ошибка при получении количества постов' }))
  }

}
