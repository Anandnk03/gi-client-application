export const roles = [
  {
    title: 'admin',
    access: [

      {
        page: 'component',
        add: true,
        edit: false,
        delete: true,
        view: true,


      },
      {
        page: 'operation',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
      {
        page: 'machine_operation',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
      {
        page: 'dashboard',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
      {
        page: 'hourlyDashboard',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
      {
        page: 'gapReason',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
      {
        page: 'plan',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
      {
        page: 'DownTime',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
      {
        page: 'rejection',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
      {
        page: 'monthlyReports',
        add: true,
        edit: false,
        delete: true,
        view: true,
      },
    ],
  },
  {
    title: 'system-admin',
    access: [
      {
        page: 'gapReason',
        add: true,
        edit: true,
        delete: true,
        view: true,
      },
    ],
  },
  {
    title: 'user',
    access: [
      {
        page: 'gapReason',
        add: false,
        edit: false,
        delete: false,
        view: true,
      },
    ],
  },
];
