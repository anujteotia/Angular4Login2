import { Component, OnInit,ElementRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService} from '../services/alert.service';
import { FileUploader } from 'ng2-file-upload';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


const URL = 'http://localhost:4200';


@Component({
    moduleId: module.id,
    templateUrl: 'upload.component.html'
})
export class UploadComponent implements OnInit {
  loading = false;
	public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  title = 'Upload';

  ngOnInit() {
   this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
   this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            alert(response);
        };
  }

  constructor(private http: Http, private el: ElementRef, private router: Router,
        private alertService: AlertService) {}
  
  upload() {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        console.log("I'm+ "+inputEl);
        let fileCount: number = inputEl.files.length;
        console.log(fileCount);
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('photo', inputEl.files.item(i));
            }
            this.http
                .post(URL, formData).map((res:any) => res).subscribe(
                   data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/upload']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

        }
       }
}