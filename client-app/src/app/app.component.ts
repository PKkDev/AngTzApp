import { Component, OnInit } from '@angular/core';
import { CompackBannerService, TypeMessage, TypePositionMessage } from 'ngx-compack';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private cbs: CompackBannerService
  ) { }

  ngOnInit() {
    this.cbs.addNewMessage({
      position: TypePositionMessage.TopRight,
      typeMessage: TypeMessage.Info,
      intervalView: 15,
      message: 'Пример фронта под тз. \n Для авторизации: \n логин: admin \n пароль: complex'
    });
  }
}
