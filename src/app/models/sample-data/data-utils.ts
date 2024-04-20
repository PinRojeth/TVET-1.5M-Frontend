import EnumConstant, { AcademicType } from "../enums/enumConstant";

export const Results = [{ id: 1, name: 'passed' }, { id: -1, name: 'failed' }, { id: 0, name: 'undefined' }];
export const AttendanceTypes = [
    { id: EnumConstant.Attendance.ABSENT, name: 'absent' },
    { id: EnumConstant.Attendance.PERMISSION, name: 'permission' }
]
export const AcademicTypes = [
    { id: AcademicType.PROGRAM, name: "Academic Program" },
    { id: AcademicType.SHORT_COURSE, name: "Short Course" }
]
