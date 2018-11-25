export const loginRouter = {
  path: '/login',
  name: 'login',
  title: 'LogIn',
  component: () => import('src/scenes/Login'),
};

export const appRouters = [
  {
    path: '/',
    exact: true,
    name: 'home',
    permission: '',
    title: 'Home',
    icon: 'home',
    component: () => import('src/scenes/Dashboard'),
  },
  {
    path: '/users',
    permission: 'Pages.Users',
    title: 'Users',
    name: 'user',
    icon: 'user',
    component: () => import('src/scenes/Users'),
  },
  {
    path: '/roles',
    permission: 'Pages.Roles',
    title: 'Roles',
    name: 'role',
    icon: 'tags',
    component: () => import('src/scenes/Roles'),
  },
  {
    path: '/tenants',
    permission: 'Pages.Tenants',
    title: 'Tenants',
    name: 'tenant',
    icon: 'appstore',
    component: () => import('src/scenes/Tenants'),
  },
  {
    path: '/about',
    title: 'About',
    name: 'about',
    icon: 'info-circle',
    component: () => import('src/scenes/About'),
  },
];
export const routers = [loginRouter, ...appRouters];
