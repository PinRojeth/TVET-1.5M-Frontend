import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/models/address';

@Pipe({
  name: 'fullAddress'
})
export class FullAddressPipe implements PipeTransform {
  /** data | fullAddress: 'medium' */
  transform(value: Address, opt?: string): string {
    if (value && !opt) {
      return `${value?.street} ${value.house_number} ភូមិ${value.villages.name} ឃុំ/សង្កាត់${value.communes.name} ស្រុក/ខណ្ឌ${value.districts.name} ខេត្ត/រាជធានី${value.city_provinces?.name}`;
    } else if (value && opt == 'medium') {
      return `ភូមិ${value.villages.name} ឃុំ/សង្កាត់${value.communes.name} ស្រុក/ខណ្ឌ${value.districts.name} ខេត្ត/រាជធានី${value.city_provinces?.name}`;
    }
    return '';
  }
}
