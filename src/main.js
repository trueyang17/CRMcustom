import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.min.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false; 

Vue.directive( 'power',{
  inserted(el,binding){
    let arrVal = binding.value.split('|'),//departcustomer|allcustomer
    power = store.state.power,
    flag = false;
    flag = arrVal.some(item=>{
      return power.includes(item);
    })
    console.log(power,el)
    // !flag ? el.parentNode.removeChild(el) : null;
    !flag ? el.remove() : null;
  }
});  

import { queryPower,checkLogin } from '@/api/login'
checkLogin().then(res=>{
  if (res) {
    store.commit('isLogin',res)
    return queryPower() 
  }
}).catch(()=>{
  Vue.prototype.$alert('进入此页面，请先登录验证','系统提示',{
    callback: ()=>{
      router.push('/login')
    }
  })
}).then(power=>{
  store.commit('queryPower',power)
  new Vue({
    router,  
    store,
    render: h => h(App)
  }).$mount('#app')
})

 