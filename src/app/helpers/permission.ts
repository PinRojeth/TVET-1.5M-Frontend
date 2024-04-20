export const pAdmin = {
  account: {
    read: 'a.account.read',
    write: 'a.account.write'
  },
  applyMajor: {
    read: 'a.applyMajor.read',
    write: 'a.applyMajor.write',
    delete: 'a.applyMajor.delete'
  },

  staff: {
    read: 'a.staff.read',
    write: 'a.staff.write',
    resetPwd: 'a.staff.resetPwd',
    setActive: 'a.staff.setActive',
    class: 'a.staff.class',
    changeRole: 'a.staff.changeRole'
  },

  student: {
    readRequesting: 'a.student.readRequesting',
    readRejected: 'a.student.readRejected',
    writeRequesting: 'a.student.writeRequesting',
    readApproved: 'a.student.readApproved',
    readQuit: 'a.student.readQuit',
    writeApproved: 'a.student.writeApproved',
    resumeStudy: 'a.student.resumeStudy',
    write: 'a.student.write',
    apply: 'a.student.apply',
    read: 'a.student.read',
    writeUser: 'a.student.writeUser',
    request: 'a.student.request',
    addPoorId: 'a.student.addPoorId'
  },

  school: {
    read: 'a.school.read',
    update: 'a.school.update',
    write: 'a.school.write'
  },

  studentAttendance: {
    read: 'a.studentAttendance.read',
    write: 'a.studentAttendance.write',
    delete: 'a.studentAttendance.delete'
  },

  // report: {
  //   approvedStudentGraph: 'a.report.approvedStudentGraph',
  //   studentList: 'a.report.studentList',
  //   adminDataStudentApply: 'a.report.adminDataStudentApply',
  //   adminDataApprovedCount: 'a.report.adminDataApprovedCount',
  //   adminDataStudentApplyByMajor: 'a.report.adminDataStudentApplyByMajor',
  //   adminDataApprovedCountByMajor: "a.report.adminDataApprovedCountByMajor"
  // },
  report: {
    studentList: 'a.report.studentList',
    adminDataStudentApply: 'a.report.adminDataStudentApply',
    adminDataApprovedCount: 'a.report.adminDataApprovedCount'
  },

  course: {
    read: 'a.course.read',
    write: 'a.course.write',
    delete: 'a.course.delete',
    setActive: 'a.course.setActive'
  },

  poorStudent: {
    writeApproved: 'a.poorStudent.writeApproved',
    read: 'a.poorStudent.read',
    request: 'a.poorStudent.request'
  },

  landingPageCms: {
    read: 'a.landingPageCms.read',
    write: 'a.landingPageCms.write'
  },

  sector: {
    read: 'a.sector.read',
    write: 'a.sector.write',
    delete: 'a.sector.delete'
  },

  shift: {
    read: 'a.shift.read',
    write: 'a.shift.write',
    delete: 'a.shift.delete'
  },

  userDepartment: {
    read: 'a.userDepartment.read',
    write: 'a.userDepartment.write',
    delete: 'a.userDepartment.delete'
  },

  attendanceRecord: {
    read: 'a.attendanceRecord.read',
    write: 'a.attendanceRecord.write',
    delete: 'a.attendanceRecord.delete'
  },

  scholarshipPayment: {
    read: 'a.scholarshipPayment.read',
    write: 'a.scholarshipPayment.write',
    delete: 'a.scholarshipPayment.delete'
  },

  attendance: {
    read: 'a.attendance.read',
    write: 'a.attendance.write',
    delete: 'a.attendance.delete'
  },

  attendanceSubmit: {
    read: 'a.attendanceSubmit.read',
    write: 'a.attendanceSubmit.write',
    delete: 'a.attendanceSubmit.delete'
  },

  verifyStudent: {
    writeApproved: 'a.verifyStudent.writeApproved',
    read: 'a.verifyStudent.read',
    request: 'a.verifyStudent.request'
  },

  approvalInfoStudent: {
    writeApproved: 'a.approvalInfoStudent.writeApproved',
    read: 'a.approvalInfoStudent.read',
    request: 'a.approvalInfoStudent.request'
  },

  systemConfig: {
    read: 'a.systemConfig.read',
    write: 'a.systemConfig.write'
  },

  adminAction: {
    update_poor_id: 'a.adminAction.update_poor_id',
  }
};
