import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateAPI'
})
export class TranslateApiPipe implements PipeTransform {
  transform(value: object, lang: string, key_km?: string, key_en?: string): string {
    if (value) {
      let newValue: string;
      let km: string = key_km ?? 'name';
      let en: string = key_en ?? km + '_en';

      if (lang === 'en') newValue = this.injectKey(value, en);
      else newValue = this.injectKey(value, km);

      return newValue;
    }
  }

  injectKey(obj: object, path: string): string {
    let array: string[] = path.split('.');
    let res: object = obj;
    for (let i = 0; i < array.length; i++) {
      res = res[array[i]];
    }
    return res?.toString();
  }
}
