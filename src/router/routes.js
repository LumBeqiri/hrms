import store from '@state/store'
//import Login from '@views/authentication/Login.vue'

const Login = () => import(/* webpackChunkName: "Login" */ '@views/authentication/Login.vue');
const Signup = () => import(/* webpackChunkName: "Signup" */ '@views/authentication/Signup.vue');

const Dashboard = () => import(/* webpackChunkName: "AdminPageDashboard" */ '@views/admin/dashboard/dashboard.vue');
const Departments = () => import(/* webpackChunkName: "AdminPageDepartments" */ '@views/admin/departments.vue');
const DepartmentSingle = () => import(/* webpackChunkName: "DepartmentSingle" */ '@views/admin/departmentSingle.vue');
const Users = () => import(/* webpackChunkName: "Users" */ '@views/admin/users.vue');
const UsersSingle = () => import(/* webpackChunkName: "Users" */ '@views/admin/usersSingle.vue');



export default [
  /* ------------------------ PUBLIC SCREENS ------------------------------ */
  {
    path: '/',
    component: resolve => require(['@layouts/LayoutPublic.vue'], resolve),
    meta: {
      authRequired: false
    },
    children: [{
        path: '',
        name: 'Home',
        component: resolve => require(['@views/Home.vue'], resolve)
      },
      {
        path: 'about',
        name: 'about',
        component: resolve => require(['@views/About.vue'], resolve)
      }
    ],
  },
  /* ------------------------ AUTH SCREENS ------------------------------ */
  {
    path: '/auth',
    component: resolve => require(['@layouts/LayoutAuthentication.vue'], resolve),
    children: [{
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup,
      }
    ],
  },
  /* ------------------------ ADMIN SCREENS ------------------------------ */
  {
    path: '/app',
    component: resolve => require(['@layouts/LayoutAdmin.vue'], resolve),
    meta: {
      authRequired: true,
    },
    beforeResolve(routeTo, routeFrom, next) {
      // If the user is already logged in
      if (!store.getters['user/auth/isLoggedin']) {
        // Redirect to the home page instead
      next({
          name: 'login'
        })
      } else {
        // Continue to the login page
        next()
      }
    },
    children: [
      {
        path: 'dashboard',
        name: 'AdminPageDashboard',
        component: Dashboard,
      },
      {
        path: 'departments',
        name: 'departments',
        component: Departments,
      },
      {
        path: 'departments/:departmentId',
        name: 'departmentSingle',
        component: DepartmentSingle
      },
      {

        path: 'users',
        name: 'users',
        component: Users,
      },
      {

        path: 'users/:userId',
        name: 'usersSingle',
        component: UsersSingle,
      },



      // {
      //   path: 'user',
      //   name: 'AdminPageDocs',
      //   component: resolve => require(['@layouts/admin/layoutProfile/LayoutMain.vue'], resolve),
      //   children: [
      //     {
      //       path: 'identification',
      //       name: 'UserIdentification',
      //       component: UserIdentification,
      //     },
      //   ]
      // }

    ],
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404.vue').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },


  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]