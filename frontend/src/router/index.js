import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: () => import('@/views/Register'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/Index'),
    children: [
      {
        path: '/',
        name: 'loans',
        component: () => import('@/views/admin/loans/LoansView'),
      },
      {
        path: '/admin/addbook',
        name: 'addbook',
        component: () => import('@/views/admin/books/AddBookView'),
      },
      {
        path: '/admin/updatebook/:id',
        name: 'updatebook',
        component: () => import('@/views/admin/books/UpdateBookView'),
      },
      {
        path: '/admin/inventory',
        name: 'inventory',
        component: () => import('@/views/admin/inventory/InventoryView'),
      },
      {
        path: '/admin/addloan',
        name: 'addloan',
        component: () => import('@/views/admin/loans/AddLoanView'),
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Index'),
    children: [
      {
        path: '/',
        name: 'profile',
        component: () => import('@/views/dashboard/profile/ProfileView'),
      },
      {
        path: '/dashboard/loans',
        name: 'loans',
        component: () => import('@/views/dashboard/loans/LoansView'),
      },
    ],
  }
]

const router = new VueRouter({
  routes
})

export default router
