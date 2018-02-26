import Main from '@/views/Main.vue';
import util from '@/libs/util.js';

//title properties are localization keys.

export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'LogIn'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404 - Page does not exist'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403 - You are not authorized'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500 - Server error'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};
export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// A route which is not displayed in the left menu
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: 'HomePage', name: 'home_index', component: () => import('@/views/home/home.vue') }
    ]
};

// Left menu items
export const appRouter = [
    {
        path: '/admin',
        icon: 'settings',
        title: 'Administration',
        name: 'administration',
        component: Main,
        children: [
            { path: 'tenants', title: 'Tenants', name: 'tenants',permission:'Pages.Tenants', component: () => import('@/views/admin/tenants/tenants.vue') },
            { path: 'users', title: 'Users', name: 'users',permission:'Pages.Users', component: () => import('@/views/admin/users/users.vue') },
            { path: 'roles', title: 'Roles', name: 'roles',permission:'Pages.Roles', component: () => import('@/views/admin/roles/roles.vue') },
            { path: 'about', title: 'About', name:'about',component:()=>import('@/views/admin/about/about.vue')}
        ]
    }
];

// All the routes defined above should be written in the routers below
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
