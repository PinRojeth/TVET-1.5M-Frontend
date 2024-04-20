import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staffRole'
})
export class StaffRolePipe implements PipeTransform {
  transform(role: number): string {
    let roleString: string = '';

    if (!role) return '';
    switch (role) {
      case 2:
        roleString = 'School Admin';
        break;
      case 3:
        roleString = 'Teacher';
        break;
      case 4:
        roleString = 'Student';
        break;
      case 5:
        roleString = 'Faculty';
        break;
      case 6:
        roleString = 'Department';
        break;
      case 11:
        roleString = 'Admin';
        break;

      default:
        roleString = roleString;
        break;
    }
    return roleString;
  }
  // transform(name: string): string {
  //   let role: string = '';
  //   if (name) {
  //     role = name.toLowerCase();
  //   }
  //   let result: string = '';
  //   switch (role) {
  //     case 'teacher':
  //       result = 'គ្រូបង្រៀន';
  //       break;
  //     case 'homeroom_teacher':
  //       result = 'គ្រូបង្រៀនបន្ទុក';
  //       break;
  //     case 'school':
  //       result = 'រដ្ឋបាលសាលា';
  //       break;
  //     case 'reviewer':
  //       result = 'អ្នកត្រួតពិនិត្យ';
  //       break;
  //     case 'officer':
  //       result = 'ការិយាល័យ';
  //       break;
  //     default:
  //       result = name;
  //       break;
  //   }
  //   return result;
  // }
}
