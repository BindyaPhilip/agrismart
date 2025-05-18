import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/auth/Login.vue";
import Layout from "@/pages/auth/Layout.vue";
import ForgotPassword from "@/pages/auth/ForgotPassword.vue";
import Activation from "@/pages/auth/Activation.vue";
// import SignUp from "@/pages/auth/SignUp.vue";
import SignUp from "@/pages/auth/NewSignUp.vue";
import ExpertSignUp from "@/pages/auth/ExpertSignUp.vue";
import EducationResources from "@/pages/education-resources/EducationResources.vue"
import CreatePost from  "@/pages/community-posts/CreatePost.vue"
import CreateAvailabilitySlot from  "@/pages/availability-slots/CreateAvailabilitySlot.vue"
import farmerslots from "@/pages/availability-slots/farmerslots.vue"
import Bookings from "@/pages/availability-slots/Bookings.vue"
import AllPosts from "@/pages/community-posts/AllPosts.vue"
import Comments from "@/pages/community-posts/Comments.vue"
import Default from "@/pages/layouts/Default.vue";
import MainLayout from "@/pages/layouts/MainLayout.vue";
import Dashboard from "@/pages/mails/Dashboard.vue";
import VerifyEmail from "@/pages/auth/VerifyEmail.vue";
import {useAuthStore} from "@/stores/auth";

import Settings from "@/pages/settings/Settings.vue";
import Profile from "@/pages/profile/Profile.vue";
import ConfirmPassword from "@/pages/auth/ConfirmPassword.vue";

import ImageUpload from "@/pages/image-analysis-mgt/ImageUpload.vue"
import ModelTraining from "@/pages/image-analysis-mgt/ModelTraining.vue"
import Blank from "@/pages/layouts/Blank.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/auth"
    },
    {
      path: '/auth',
      name: 'auth',
      component: Layout,
      beforeEnter: (to, from, next) => {
        const accessToken =  localStorage.getItem('accessToken')
        if(accessToken){
          next("/account")
        }else {
          next();
        }
      },
      children: [
        {
          path: "",
          name: 'login',
          component: Login
        },
        {
          path: "forgot-password",
          name: 'forgot-password',
          component: ForgotPassword
        },
        {
          path: "activation",
          name: 'activation',
          component: Activation
        },
        {
          path: "signup",
          name: 'signup',
          component: SignUp
        },
        {
          path: "expert-signup",
          name: 'expert-signup',
          component: ExpertSignUp
        },
        {
          path: "verify-email",
          name: 'verify-email',
          component: VerifyEmail
        },
        {
          path: "confirm-password-reset",
          name: 'confirm-password-reset',
          component: ConfirmPassword
        },
      ],
    },
    {
      path: "/account",
      component: MainLayout,
      name: "Account",
      //REMEMBER TO CHANGE THIS TO TRUE
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: 'Dashboard',
          component: Dashboard
        },
       
        {
          path: "addresses",
          component:Blank,
          name:"System",
          children:[
            // {
            //   path: "",
            //   name: "My Addresses",
            //   component: Addresses
            // },
            {
              path: "image-analysis",
              name: "Image Analysis",
              component: ImageUpload
            },
            {
              path: "education-resources",
              name: 'Education Resources',
              component: EducationResources
            },
            {
              path: "model-training",
              name: 'Model Training',
              component: ModelTraining
          },
          
              {
                path: "all-posts",
                component: AllPosts,
                name: "Posts",
              },
              {
                path:":id",
                component:Comments,
                name: "Comments"
              },
              {
                path: "community-posts",
                name: 'Community Posts',
                component: CreatePost
              },
               {
                path: "availability-slots",
                name: 'Availability Slots',
                component: CreateAvailabilitySlot
              },  {
                path: "slots",
                name: 'Slots',
                component: farmerslots
              },
               {
                path: "bookings",
                name: 'Bookings',
                component: Bookings
              },
          ]
        },
        {
          path: "settings",
          name: 'settings',
          component: Settings
        },
        {
          path: "profile",
          name: 'profile',
          component: Profile
        },
      ]
    }
  ]

})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const accessToken =  localStorage.getItem('accessToken')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!accessToken) {
      authStore.returnUrl = to.fullPath;
      next('/auth');
    } else {
      try {
        next();
      } catch (error) {
        next('/auth'); // Redirect to login if refresh fails
      }
    }
  } else {
    next();
  }
});

export default router
