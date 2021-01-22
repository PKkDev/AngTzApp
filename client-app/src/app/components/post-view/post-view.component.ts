import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CompackToastService, TypeToast } from 'ngx-compack';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';
import { Post } from '../model/post';
import { saveAs } from 'file-saver';
import { LoadFileQuery } from '../model/load-file-query';


export class SelectedFiles {
  public file: File;
  public name: string;
  public size: number;
  constructor() {
    this.name = '';
    this.size = 0;
    this.file = new File([], '')
  }
}

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit, AfterViewInit, OnDestroy {
  // input config
  @Input() postData: Post | undefined = undefined;
  // типы шаблонов
  @ViewChild('readTemplate', { static: false }) readTemplate!: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate!: TemplateRef<any>;
  private isEdit = false;
  public selectedTemplate = this.readTemplate;
  // editet post
  public editedPost: Post | undefined = undefined
  public selectedFiles: SelectedFiles[] = [];
  // http
  private subsDel: any;
  private subsUpdate: any;


  constructor(
    private http: HttpClient,
    private postService: PostService,
    private cts: CompackToastService,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadTemplate();
  }

  ngOnDestroy() {
    this.acceptError();
  }

  public editePost() {
    this.editedPost = JSON.parse(JSON.stringify(this.postData));
    this.isEdit = !this.isEdit;
    this.loadTemplate();

  }

  public cancelEdit(isNew: boolean) {
    if (isNew) {
      this.postService.emiteCancelAddPosts();
    } else {
      this.editedPost = undefined;
      this.isEdit = !this.isEdit;
      this.loadTemplate();
    }
  }

  public removePost() {
    if (this.editedPost) {
      if (window.confirm('точно?')) {
        const param = new HttpParams()
          .append('id', this.editedPost.id.toString())
        this.subsDel = this.apiService.post("post/remove-post", undefined, param)
          .subscribe(
            next => {
              this.postService.emiteUpdatePosts();
              this.cts.emitNewNotif({ type: TypeToast.Info, title: 'Удаление поста', message: 'Успешно' });
            },
            error => {
              this.acceptError();
              this.cts.emitNewNotif({ type: TypeToast.Error, title: 'Удаление поста', message: 'Произошла ошибка' });
            }
          );
      }
    }
  }

  public removeFileFromServer(name: string) {
    if (this.editedPost) {
      if (window.confirm('точно?')) {
        const param = new HttpParams()
          .append('id', this.editedPost.id.toString())
          .append('name', name)
        this.subsDel = this.apiService.post("post/remove-file", undefined, param)
          .subscribe(
            next => {
              this.postService.emiteUpdatePosts();
              this.cts.emitNewNotif({ type: TypeToast.Info, title: 'Удаление файла', message: 'Успешно' });
            },
            error => {
              this.acceptError();
              this.cts.emitNewNotif({ type: TypeToast.Error, title: 'Удаление файла', message: 'Произошла ошибка' });
            }
          );
      }
    }
  }
  public removeFileFromSelected(name: string) {
    const index = this.selectedFiles.findIndex(x => x.name == name);
    if (index != -1) {
      this.selectedFiles.splice(index, 1);
    }
  }

  public updatePost() {
    if (this.editedPost) {
      let url = ''
      if (this.editedPost.isNew)
        url = 'post/add-post';
      else
        url = 'post/update-post?id=' + this.editedPost.id.toString();
      // const param = new HttpParams()
      //   .append('id', this.editedPost.id.toString())
      this.subsDel = this.apiService.post<number>(url, this.editedPost)//, param)
        .subscribe(
          next => {
            console.log(next);
            if (next != -1) {
              setTimeout(
                () => {
                  this.sendFileToServer(next);
                }, 1500
              );
            }
            this.cts.emitNewNotif({ type: TypeToast.Info, title: 'Изменение поста', message: 'Успешно' });
          },
          error => {
            this.acceptError();
            this.cts.emitNewNotif({ type: TypeToast.Error, title: 'Изменение поста', message: 'Произошла ошибка' });
          },
          () => {

          }
        );
    }
  }

  onFileSelected(input: HTMLInputElement) {
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        if (file) {
          if (this.editedPost?.fileDescDto.findIndex(x => x.name == file.name) == -1) {
            const reader = new FileReader();
            reader.onloadend = () => {
              // this.chesIcon = reader.result;
            };
            reader.readAsDataURL(file);
            // this.chesIconName = this.file.name;
            this.selectedFiles.push({
              file: file,
              name: file.name,
              size: file.size
            });
          } else {
            this.cts.emitNewNotif({ type: TypeToast.Error, title: 'Выбор файлов', message: 'Дубликат файла' });
          }

        }
      }
    }
  }

  sendFileToServer(id: number) {
    if (this.selectedFiles.length != 0 && this.editedPost) {
      const url = 'post/update-file';
      const formData = new FormData();

      for (let i = 0; i < this.selectedFiles.length; i++) {
        if (this.selectedFiles[i].file)
          formData.append('files', this.selectedFiles[i].file, this.selectedFiles[i].name);
      }

      const req = new HttpRequest('POST', environment.urlApi + url, formData, {
        reportProgress: true,
        params: new HttpParams()
          .append('id', id.toString())//this.editedPost.id.toString())
      });

      this.http.request(req)
        .subscribe(next => { },
          error => {
            console.log(error);
            this.cts.emitNewNotif({ type: TypeToast.Error, title: 'Изменение файлов поста', message: 'Успешно' });
          },
          () => {
            this.cts.emitNewNotif({ type: TypeToast.Info, title: 'Изменение файлов поста', message: 'Успешно' });
            this.postService.emiteUpdatePosts();
          });
    }
    else
      this.postService.emiteUpdatePosts();
  }

  download(name: string) {
    if (window.confirm('скачать?')) {
      if (this.postData) {
        const httpBody = new LoadFileQuery(name, this.postData.id);
        this.http.post(environment.urlApi + "post/file", httpBody, {
          reportProgress: true,
          responseType: 'blob'
        }).subscribe(
          next => {
            saveAs(next, name);
          }, error => {
            this.acceptError();
            this.cts.emitNewNotif({ type: TypeToast.Error, title: 'Загрузка файла', message: 'Произошла ошибка' });
          }
        )
      }
    }
  }

  public loadTemplate() {
    if (this.postData?.isNew) {
      this.editedPost = JSON.parse(JSON.stringify(this.postData));
      this.selectedTemplate = this.editTemplate;
    } else {
      if (this.isEdit)
        this.selectedTemplate = this.editTemplate;
      else
        this.selectedTemplate = this.readTemplate;
    }
    this.cdr.detectChanges();
  }

  private acceptError() {
    if (this.subsDel)
      this.subsDel.unsubscribe();
    if (this.subsUpdate)
      this.subsUpdate.unsubscribe();
  }

}