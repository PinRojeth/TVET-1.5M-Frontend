import { HttpClient } from '@angular/common/http';
import { Directive, HostListener, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, switchMap, takeUntil } from 'rxjs';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';

@Directive({
  selector: '[appDownload]'
})
export class DownloadDirective extends Unsubscribe {
  constructor(private http: HttpClient, protected sanitizer: DomSanitizer) {
    super();
  }

  @Input() appDownload: { file: string; fileName: string };

  @HostListener('click') onClick() {
    this.getBase64Image();
  }

  getBase64Image(): void {
    this.http
      .get(this.appDownload.file, { responseType: 'blob' })
      .pipe(
        switchMap(blob => this.convertBlobToBase64(blob)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((base64ImageUrl: string) => {
        const link = document.createElement('a');
        link.href = base64ImageUrl as string;
        link.download = this.appDownload.fileName ?? 'download';
        link.click();
      });
  }

  convertBlobToBase64(blob: Blob): Observable<string> {
    return Observable.create(observer => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        observer.next(event.target.result);
        observer.complete();
      };

      reader.onerror = (event: ProgressEvent<FileReader>) => {
        console.log('File could not be read: ' + event.target.error.code);
        observer.next(event.target.error.code);
        observer.complete();
      };
    });
  }
}
