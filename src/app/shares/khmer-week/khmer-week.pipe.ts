import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'khmerWeek'
})
export class KhmerWeekPipe implements PipeTransform {

  transform(value: any): any {
    if(Array.isArray(value)) {
      for (let i: number = 0; i < value.length; i++) {
        switch (value[i].toLowerCase().toString()) {
          case 'monday': value[i] = "ចន្ទ"; break;
          case 'tuesday': value[i] = "អង្គារ"; break;
          case 'wednesday': value[i] = "ពុធ"; break;
          case 'thursday': value[i] = "ព្រហស្បតិ៍"; break;
          case 'friday': value[i] = "សុក្រ"; break;
          case 'saturday': value[i] = "សៅរ៏"; break;
          case 'sunday': value[i] = "អាទិត្យ"; break;
        }
      }
    } else if (typeof value === "string" ) {
      switch (value.toLowerCase().toString()) {
        case 'monday': value = "ចន្ទ"; break;
        case 'tuesday': value = "អង្គារ"; break;
        case 'wednesday': value = "ពុធ"; break;
        case 'thursday': value = "ព្រហស្បតិ៍"; break;
        case 'friday': value = "សុក្រ"; break;
        case 'saturday': value = "សៅរ៏"; break;
        case 'sunday': value = "អាទិត្យ"; break;
      }
    } else {
      const DATE = new Date(value);
      let week: number = null;

      if(value instanceof Date)
        week = DATE.getDay();
      else
        week = DATE.getDay() + 1;

      switch (week) {
        case 1: value = "ចន្ទ"; break;
        case 2: value = "អង្គារ"; break;
        case 3: value = "ពុធ"; break;
        case 4: value = "ព្រហស្បតិ៍"; break;
        case 5: value = "សុក្រ"; break;
        case 6: value = "សៅរ៏"; break;
        case 0: value = "អាទិត្យ"; break;
      }
    }
    return value;
  }

}
