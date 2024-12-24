import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function isLoggedIn () {
  return !!localStorage.getItem('adminData')
}

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/testRedirect',
    name: 'testRedirect',
    component: () => import('../views/testRedirect.vue')
  },
  {
    path: '/mobile/auth/:token',
    name: 'mobile-auth',
    component: () => import('../views/Mobile/Auth.vue')
  },
  {
    path: '/redirect/:page/:token',
    name: 'redirect',
    component: () => import('../views/redirect.vue')
  },
  // {
  //   path: '/login-test',
  //   name: 'login-test',
  //   component: () => import('../views/Mobile/User/HomePage.vue')
  // },
  {
    path: '/login-member',
    name: 'login-member',
    component: () => import('../views/Mobile/User/Login.vue')
  },
  {
    path: '/login',
    name: 'admin-login',
    component: () => import('../views/Admin/Login.vue')
  },
  {
    path: '/index',
    name: 'index-page',
    component: () => import('../views/Index.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: '/admin/members', // จัดการสมาชิก
        name: 'members-page',
        component: () => import('../views/Admin/MembersPage.vue')
      },
      {
        path: '/admin/payment', // รายการชำระเงิน
        name: 'list-payment',
        component: () => import('../views/Admin/ListPayment.vue')
      },
      // {
      //   path: '/admin/detail', // รายการชำระเงิน
      //   name: 'admin-detail',
      //   component: () => import('../views/Admin/ManageMember.vue')
      // }
      {
        path: '/admin/detail-member/:id',
        name: 'admin-detail',
        component: () => import('../views/Admin/ManageMember.vue')
      },
      {
        path: '/admin/detail-nonmember/:id',
        name: 'admin-detail',
        component: () => import('../views/Admin/ManageMember-non.vue')
      }
      // {
      //   path: '/admin/dashboard',
      //   name: 'admin-dashboard',
      //   component: () => import('../views/Admin/DashBoard.vue')
      // }
    ]
  },
  {
    path: '/consent',
    name: 'Consent',
    component: () => import('../views/Mobile/Consent.vue')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('../views/Mobile/User/HomePage.vue')
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: () => import('../views/Mobile/User/Register.vue')
  // },
  {
    path: '/register-new-member',
    name: 'register-new-member',
    component: () => import('../views/Mobile/Register/RegisterNewMember.vue')

  },
  {
    path: '/login-old-member',
    name: 'login-old-member',
    component: () => import('../views/Mobile/Register/LoginOldMember.vue')

  },
  {
    path: '/register-undesirable',
    name: 'register-undesirable',
    component: () => import('../views/Mobile/Register/RegisterUndesirable.vue')

  },
  {
    path: '/profile/homepage',
    name: 'profile-hompage',
    component: () => import('../views/Mobile/Profile/HomePage.vue')
  },
  {
    path: '/profile/payment-qpcode',
    name: 'profile-payment-qpcode',
    component: () => import('../views/Mobile/Profile/QRCodePage.vue')
  },
  {
    path: '/profile/payment-success',
    name: 'profile-payment-success',
    component: () => import('../views/Mobile/Profile/PaymentSuccess.vue')
  },
  {
    path: '/profile/detail',
    name: 'profile-detail',
    component: () => import('../views/Mobile/Profile/MemberDetail.vue')
  },
  {
    path: '/profile/update-detail',
    name: 'profile-update-detail',
    component: () => import('../views/Mobile/Profile/UpdatePage.vue')
  },
  {
    path: '/reject',
    name: 'reject',
    component: () => import('../views/Mobile/User/Reject.vue')
  },
  {
    path: '/searchMember',
    name: 'search',
    component: () => import('../views/Mobile/Profile/SearchMember.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // ตรวจสอบเฉพาะ path ที่ขึ้นต้นด้วย '/admin/'
  if (to.path.startsWith('/admin/')) {
    if (!isLoggedIn()) {
      next({ name: 'admin-login' }) // เปลี่ยนเส้นทางไปที่หน้า Login
    } else {
      next() // อนุญาตให้เข้าถึง
    }
  } else {
    next() // อนุญาตให้เข้าถึงหน้าอื่น ๆ ที่ไม่ใช่ '/admin/'
  }
})

export default router
