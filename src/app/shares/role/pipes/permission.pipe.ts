import { Pipe, PipeTransform } from '@angular/core';
import { RoleId } from 'src/app/models/enums/enumConstant';
import { RoleCheckerService } from 'src/app/services/role-checker.service';

@Pipe({
    name: 'permission'
})
export class PermissionPipe implements PipeTransform {

    constructor(private roleCheckerService: RoleCheckerService) { }

    transform(arr: string[]): boolean {
        let perms: string[] = this.roleCheckerService.GetPermissions();

        if (perms == undefined || perms.length <= 0) {
            return false;
        }
        for (let i = 0; i < arr.length; i++) {
            if (perms.filter(e => e == arr[i]).length > 0) {
                return true;
            }
        }
        return false;
    }

}
