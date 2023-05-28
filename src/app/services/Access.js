export const roles = [
  {
    title: 'admin',
    access: [
      {
        page: 'dashboard',
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
        view: false,
      },
    ],
  },
];
