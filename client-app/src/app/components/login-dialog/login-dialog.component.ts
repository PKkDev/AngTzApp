import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompackToastService, TypeToast } from 'ngx-compack';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  // field
  public userName: string | undefined;
  public password: string | undefined;
  // http
  private sub: Subscription | null | undefined;

  constructor(
    private cts: CompackToastService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  logIn() {
    if (this.userName && this.password)
      this.sub = this.authService.logIn(this.userName, this.password)
        .subscribe(
          (data: boolean) => {
            if (data) {
              this.cts.emitNewNotif({ title: 'Auth', message: 'Success', type: TypeToast.Success });
              this.dialogRef.close(true);
            }

            else
              this.cts.emitNewNotif({ title: 'Auth', message: 'Wrong log/pass', type: TypeToast.Error });
          },
          error =>
            this.cts.emitNewNotif({ title: 'Auth', message: 'Network error', type: TypeToast.Error })
        );
  }

  cLoseDialog() {
    this.dialogRef.close(false);
  }


}