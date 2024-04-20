import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageEnum } from 'src/app/models/enums/local-storage.enum';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: User | Student, lang?: string): string {
    let names = [];
    if (user === undefined) return '';
    let used_lang = lang === 'en' ? '_en' : '';

    if (user?.last_name) {
       let getVal = (user['last_name' + used_lang] == null || user['last_name' + used_lang] == "") ? user.last_name : user['last_name' + used_lang];
      names.push(getVal);
    }
    if (user?.first_name) {
      let getVal = (user['first_name' + used_lang] == null || user['first_name' + used_lang] == "") ? user.first_name : user['first_name' + used_lang];
      names.push(getVal);
    }

    return names.join(' ');
  }

  // transform(value: User | User[], id: string = ''): string {
  //   if (value) {
  //     let user: User | undefined;
  //     if (Array.isArray(value)) {
  //       user = (value as User[]).find(u => u._id == id);
  //     } else {
  //       user = value;
  //     }
  //     if (user) {
  //       let names = [];
  //       if (user.last_name) {
  //         names.push(user.last_name);
  //       }

  //       if (user.first_name) {
  //         names.push(user.first_name);
  //       }
  //       return names.join(' ');
  //     }
  //   }
  //   return '';
  // }
}
