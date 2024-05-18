import LogoutIcon from "../../../assets/icons/admin-logout-icon.svg";
import AccountSettingsIcon from "../../../assets/icons/account-settings.svg";

export type Menu = {
  id: number;
  title: string;
  path?: string;
  isSubMenu?: boolean;
  submenu?: Menu[];
};

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "For Parents",
    isSubMenu: true,
    submenu: [
      {
        id: 11,
        title: "Become a Parent",
        path: "/for-parents",
      },
      {
        id: 12,
        title: "Find Surrogate",
        path: "/find-surrogate",
      },
      {
        id: 13,
        title: "Find Agency",
        path: "/find-agency",
      },
    ],
  },
  {
    id: 3,
    title: "For Surrogate",
    isSubMenu: true,
    submenu: [
      {
        id: 21,
        title: "Become a Surrogate",
        path: "/for-surrogate",
      },
      {
        id: 22,
        title: "Find Intended Parents",
        path: "/find-parents",
      },
      {
        id: 33,
        title: "Find an Agency",
        path: "/find-agency",
      },
    ],
  },
  {
    id: 4,
    title: "For Agencies",
    isSubMenu: true,
    submenu: [
      {
        id: 31,
        title: "Let's Collaborate",
        path: "/for-agency",
      },
      {
        id: 32,
        title: "Recruit Potential Surrogates",
        path: "/find-surrogate",
      },
      {
        id: 33,
        title: "Reach Intended Parents",
        path: "/find-parents",
      },
    ],
  },
  {
    id: 5,
    title: "Resources",
    isSubMenu: true,
    submenu: [
      {
        id: 41,
        title: "Blog",
        path: "/blogs",
      },
      {
        id: 42,
        title: "FAQ",
        path: "/faq",
      },
      {
        id: 43,
        title: "Contact",
        path: "/contact",
      },
      {
        id: 44,
        title: "About",
        path: "/about-us",
      },
    ],
  },
];

export const menuDataSurrogate: Menu[] = [
  {
    id: 1,
    title: "Intended Parents",
    path: "/find-parents",
  },
  {
    id: 2,
    title: "Agencies",
    path: "/find-agency",
  },

  {
    id: 5,
    title: "Resources",
    isSubMenu: true,
    submenu: [
      {
        id: 41,
        title: "Blog",
        path: "/blogs",
      },
      {
        id: 42,
        title: "FAQ",
        path: "/faq",
      },
      {
        id: 43,
        title: "Contact",
        path: "/contact",
      },
      {
        id: 44,
        title: "About",
        path: "/about-us",
      },
    ],
  },
];
export const menuDataParent: Menu[] = [
  {
    id: 1,
    title: "Surrogates",
    path: "/find-surrogate",
  },
  {
    id: 2,
    title: "Agencies",
    path: "/find-agency",
  },

  {
    id: 5,
    title: "Resources",
    isSubMenu: true,
    submenu: [
      {
        id: 41,
        title: "Blog",
        path: "/blogs",
      },
      {
        id: 42,
        title: "FAQ",
        path: "/faq",
      },
      {
        id: 43,
        title: "Contact",
        path: "/contact",
      },
      {
        id: 44,
        title: "About",
        path: "/about-us",
      },
    ],
  },
];
export const menuDataAgency: Menu[] = [
  {
    id: 1,
    title: "Surrogates",
    path: "/find-surrogate",
  },
  {
    id: 2,
    title: "Intended Parents",
    path: "/find-parents",
  },

  {
    id: 5,
    title: "Resources",
    isSubMenu: true,
    submenu: [
      {
        id: 41,
        title: "Blog",
        path: "/blogs",
      },
      {
        id: 42,
        title: "FAQ",
        path: "/faq",
      },
      {
        id: 43,
        title: "Contact",
        path: "/contact",
      },
      {
        id: 44,
        title: "About",
        path: "/about-us",
      },
    ],
  },
];

export const adminData = [
  {
    id: 1, icon: AccountSettingsIcon,
    title: 'Account Setting',
    path: '/account-settings',
    type: 'account-setting'
  },
  {
    id: 1,
    icon: LogoutIcon,
    title: 'Log Out',
    path: '/logout',
    type: 'logout'
  },
]