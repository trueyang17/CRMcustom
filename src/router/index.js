import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
  {
    path:'/',
    redirect:'/index'
  },
  {
    path:'/login',
    component: ()=> import('@/view/Login.vue'),
  },
  {
    path:'/index',
    component: ()=> import('@/view/index.vue'),
    children:[
      {
        path:'/',
        redirect:'org'
      },
      {
        path:'org',
        component: ()=> import('@/view/org.vue'),
        children:[
          {
            path:'',
            redirect:'user',
          },
          {  
            path:'user',
            component: ()=> import('@/components/org/UserList.vue'),
          },
          {  
            path:'userAdd',
            component: ()=> import('@/components/org/UserAdd.vue'),
          },
          {  
            path:'depart',
            component: ()=> import('@/components/org/DepartList.vue'),
          },
          {  
            path:'departAdd',
            component: ()=> import('@/components/org/DepartAdd.vue'),
          },
          {  
            path:'job',
            component: ()=> import('@/components/org/JobList.vue'),
          },
          {  
            path:'jobAdd',
            component: ()=> import('@/components/org/JobAdd.vue'),
          }
        ]
      },
      {
        path:'cus',
        component: ()=> import('@/view/cus.vue'),
        children:[
          {
            path:'',
            redirect:'list?type=my',
          },
          {  
            path:'list?type=my',
            component: ()=> import('@/components/cus/list.vue'),
          },
          {
            path:'list',
            component: ()=> import('@/components/cus/list.vue'),
          },
          {
            path:'handle',
            component: ()=> import('@/components/cus/cusAdd.vue')
          },
          {
            path:'visit',
            component: ()=> import('@/components/cus/visit.vue')
          }
        ]
      },
      
    ]
  },
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
