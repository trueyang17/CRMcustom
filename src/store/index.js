import Vue from 'vue'
import Vuex from 'vuex'
import logger from'vuex/dist/logger'
Vue.use(Vuex)
import { userData } from '@/api/user';
import { departList } from '@/api/depart';
import { jobList } from '@/api/job';
import { queryCustomerList } from '@/api/custom';
export default new Vuex.Store({
  state: {
    isLogin:'',
    power:'',
    userList:'',
    departList:'',
    jobList:'',
    myList:'',
    allList:''
  },  
  mutations: {
    isLogin(state,isLogin){
      state.isLogin = isLogin;
    },
    queryPower(state,power){
      state.power = power;
    },
    queryUserList(state,userList){
      state.userList = userList;
    },
    queryJobList(state,jobList){
      state.jobList = jobList;
    },
    queryDepartList(state,departList){
      state.departList = departList;
    },
    queryCustomerList(state,payload){
      let {lx = 'my',result = {}} = payload; 
      lx === 'my' ? state.myList = result : state.allList = result
    }
  },
  actions: {
    queryUserList(context,res){
      userData().then(res=>{
        context.commit('queryUserList',res)
      })
    },
    queryJobList(context,res){
      jobList().then(res=>{
        context.commit('queryJobList',res)
      })
    },
    queryDepartList(context,res){
      departList().then(res=>{
        context.commit('queryDepartList',res)
      })
    },
    queryCustomerList(context, payload ){
      let {lx='my',page=1} = payload
      queryCustomerList({lx,page}).then(result=>{
        context.commit('queryCustomerList',{lx,result})
      })
    }
  },
  plugins:[logger()]
})
