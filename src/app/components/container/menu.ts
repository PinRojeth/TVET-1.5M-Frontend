import { pAdmin } from 'src/app/helpers/permission';
import { MenuItem } from 'src/app/models/menu-item';

export const MENU: MenuItem[] = [
  // {
  //   title: 'menu.dashboard',
  //   route: '/home',
  //   icon: '',
  //   svgIcon: 'dashboard',
  //   child: [],
  //   permissions: []
  // },
  {
    title: 'menu.sector',
    route: '/sector',
    icon: '',
    svgIcon: 'sector',
    child: [],
    permissions: [pAdmin.sector.read]
  },
  {
    title: 'menu.major',
    route: '/major',
    icon: '',
    svgIcon: 'major',
    child: [],
    permissions: [pAdmin.applyMajor.read]
  },
  {
    title: 'menu.school',
    route: '/school',
    icon: '',
    svgIcon: 'school',
    child: [],
    permissions: [pAdmin.school.read]
  },
  {
    title: 'menu.human-resource',
    route: '/human-resource',
    icon: '',
    svgIcon: 'staff',
    child: [],
    permissions: [pAdmin.staff.read]
  },
  {
    title: 'menu.course',
    route: '/course',
    icon: '',
    svgIcon: 'courses',
    child: [],
    permissions: [pAdmin.course.read]
  },
  {
    title: 'menu.student_requests',
    route: '/student-requests',
    icon: '',
    svgIcon: 'student-requests',
    child: [
      // {
      //   title: 'enum_status.Requesting',
      //   route: '/student-requests/pending',
      //   icon: '',
      //   svgIcon: 'student-requests',
      //   permissions: [pAdmin.student.readRequesting]
      // },
      // {
      //   title: 'enum_status.Rejected',
      //   route: '/student-requests/rejected',
      //   icon: '',
      //   svgIcon: 'student-requests',
      //   permissions: [pAdmin.student.readRejected]
      // }
    ],
    permissions: [pAdmin.student.readRequesting]
  },
  {
    title: 'menu.poor_student',
    route: '/poor-student',
    icon: '',
    svgIcon: 'poor-id',
    child: [],
    permissions: [pAdmin.poorStudent.read]
  },
  {
    title: 'menu.approved_student.title',
    route: '/approved-student/approved',
    icon: '',
    svgIcon: 'approved-student',
    child: [
      // {
      //   title: 'menu.approved_student.active',
      //   route: '/approved-student/approved',
      //   icon: '',
      //   svgIcon: '',
      //   permissions: [pAdmin.student.readQuit]
      // },
      // {
      //   title: 'menu.approved_student.finished',
      //   route: '/approved-student/finished',
      //   icon: '',
      //   svgIcon: '',
      //   permissions: [pAdmin.student.readApproved]
      // }
    ],
    permissions: [pAdmin.student.readApproved]
  },
  {
    title: 'ពិនិត្យប្រវត្តិរូប',
    route: 'student-info-checking',
    icon: '',
    svgIcon: 'poor-id',
    child: [
      {
        title: 'ន.បណ្តុះបណ្តាល',
        route: 'student-info-checking/verify',
        icon: '',
        svgIcon: '',
        permissions: [pAdmin.verifyStudent.read]
      },
      {
        title: 'អគ្គ អ.ប.វ.',
        route: 'student-info-checking/approval',
        icon: '',
        svgIcon: 'poor-id',
        permissions: [pAdmin.approvalInfoStudent.read]
      }
    ],
    permissions: []
  },
  {
    title: 'menu.student-attendance',
    route: '/attendance',
    icon: '',
    svgIcon: 'student-attendance',
    permissions: [],
    child: [
      {
        title: 'កត់ត្រាវត្តមាន',
        route: '/attendance/record-list',
        icon: '',
        svgIcon: '',
        permissions: [pAdmin.attendance.read]
      },
      {
        title: 'បញ្ជូនវត្តមានប្រចាំខែ',
        route: '/attendance/submit',
        icon: '',
        svgIcon: '',
        permissions: [pAdmin.attendanceSubmit.read]
      }
    ]
  },
  {
    title: 'menu.report.title',
    route: '/report',
    icon: '',
    svgIcon: 'pie-chart',
    child: [
      // {
      //   title: 'menu.report.student_requests',
      //   route: '/report/student-requests',
      //   icon: '',
      //   svgIcon: 'pie-chart',
      //   permissions: [pAdmin.report.activedStudent]
      // },
      // {
      //   title: 'ក្រាហ្វបេក្ខជន',
      //   route: '/report/student-requests',
      //   icon: '',
      //   svgIcon: 'pie-chart',
      //   permissions: [pAdmin.report.approvedStudentGraph]
      // },
      {
        title: 'បញ្ជីឈ្មោះបេក្ខជន',
        route: '/report/approve-student',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.studentList]
      },
      {
        title: 'វគ្គសិក្សា',
        route: '/report/course',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataApprovedCount]
      },
      {
        title: 'ចំនួនចុះឈ្មោះតាមគ្រឹះស្ថាន',
        route: '/report/enrollment',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataStudentApply]
      },
      {
        title: 'ចំនួនចុះឈ្មោះតាមជំនាញ',
        route: '/report/enrollment-major',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataStudentApply]
      },
      {
        title: 'ចំនួនចុះឈ្មោះ',
        route: '/report/enrollment-by-all',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataStudentApply]
      },
      {
        title: 'ចំនួនអនុម័តតាមគ្រឹះស្ថាន',
        route: '/report/approval',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataApprovedCount]
      },
      {
        title: 'ចំនួនអនុម័តតាមជំនាញ',
        route: '/report/approval-major',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataApprovedCount]
      },
      {
        title: 'ចំនួនអនុម័ត',
        route: '/report/approval-by-all',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataApprovedCount]
      },
      {
        title: 'ស្ថានភាពសិក្សាតាមគ្រឹះស្ថាន',
        route: '/report/status-by-school',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataApprovedCount]
      },
      {
        title: 'ស្ថានភាពសិក្សាតាមជំនាញ',
        route: '/report/status-by-major',
        icon: '',
        svgIcon: 'pie-chart',
        permissions: [pAdmin.report.adminDataApprovedCount]
      }
    ],
    permissions: []
  },
  {
    title: 'menu.settings',
    route: '/setting',
    icon: '',
    svgIcon: 'setting',
    permissions: [],
    child: [
      {
        title: 'គ្រប់គ្រងមាតិកា',
        route: '/setting/cms',
        icon: '',
        svgIcon: '',
        permissions: [pAdmin.landingPageCms.read]
      },
      {
        title: 'menu.shift',
        route: '/setting/shift',
        icon: '',
        svgIcon: '',
        permissions: [pAdmin.shift.read]
      },
      {
        title: 'menu.department',
        route: '/setting/department',
        icon: '',
        svgIcon: '',
        permissions: [pAdmin.userDepartment.read]
      },
      {
        title: 'System Config',
        route: '/setting/system-config',
        icon: '',
        svgIcon: '',
        permissions: [pAdmin.systemConfig.read]
      }
    ]
  }
];
