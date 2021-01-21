import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// routing
import { AppRoutingModule } from './app-routing.module';
// components
import { AppComponent } from './app.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { PostContainerComponent } from './components/post-container/post-container.component';
import { InfoPanelComponent } from './components/info-panel/info-panel.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
// compack
import { CompackBannerModule, CompackToastModule } from 'ngx-compack';
// mat
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
// page
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

@NgModule({
  declarations: [
    PostPageComponent,
    NotFoundPageComponent,
    AppComponent,
    PostViewComponent,
    PostContainerComponent,
    InfoPanelComponent,
    HeaderComponent,
    LoginDialogComponent
  ],
  imports: [
    MatTooltipModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    CompackToastModule,
    CompackBannerModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
