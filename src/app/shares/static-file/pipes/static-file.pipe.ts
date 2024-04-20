import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageEnum } from 'src/app/models/enums/local-storage.enum';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'staticFile'
})
export class StaticFilePipe implements PipeTransform {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  transform(value: string, type: 'streaming' | 'download' | 'streaming_auth' | 'download_auth' = 'download'): string {
    if (value && type === 'download') {
      return environment.file_static_url + value;
    }
    if (value && type === 'streaming') {
      return environment.file_streaming_url + value;
    }
    if (value && type === 'streaming_auth') {
      const auth_token = `${this.localStorageService.get(LocalStorageEnum.token)}`;
      return environment.api_url + "/admin/statistic_document/streaming/" + value + "?auth_token=" + auth_token;
    }
    if (value && type === 'download_auth') {
      const auth_token = `${this.localStorageService.get(LocalStorageEnum.token)}`;
      return environment.api_url + "/admin/statistic_document/download/" + value + "?auth_token=" + auth_token;
    }
    return null;
  }
}
