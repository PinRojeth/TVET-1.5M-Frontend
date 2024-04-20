import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staffFullName'
})
export class StaffFullNamePipe implements PipeTransform {

  transform(value: any, lang?: string): string {
    let fullName = [];
    if (!value) return '';
    let used_lang = lang === 'en' ? '_en' : '';
    
    if (value.titles?.name) {
      let getVal = (value['titles']['name' + used_lang] == null || value['titles']['name' + used_lang] == "") ? value.titles.name : value['titles']['name' + used_lang]; 
      fullName.push(getVal);
    }

    if (value.last_name) {
      let getVal = (value['last_name' + used_lang] == null || value['last_name' + used_lang] == "") ? value.last_name : value['last_name' + used_lang]; 
      fullName.push(getVal);
    }

    if (value.first_name) {
      let getVal = (value['first_name' + used_lang] == null || value['first_name' + used_lang] == "") ? value.first_name : value['first_name' + used_lang]; 
      fullName.push(getVal);
    }

    if (value.name) {
      let getVal = (value['name' + used_lang] == null || value['name' + used_lang] == "") ? value.titles.name : value['name' + used_lang]; 
      fullName.push(getVal);
    }

    return fullName.join(' ');
  }
}
