export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //         { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //         { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            { //quan ly lich kham
                name: 'menu.admin.manage-schedule', link: '/system/manage-schedule'

            },

        ]
    },
    { //quan ly phong kham
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    { //quan ly chuyen khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { //quan ly cam nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    },
];

export const doctorMenu = [
    { //quan ly lich kham
        name: 'menu.detailDoctor.manage-schedule',
        menus: [
            {
                name: 'menu.detailDoctor.schedule', link: '/system/manage-schedule'
            },
            {
                name: 'menu.detailDoctor.patient', link: '/system/manage-patient'
            },
        ]
    },

];