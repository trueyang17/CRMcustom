<template>
  <div class="cus" ref="cus">
    <div class="aside" ref="aside">
      <el-menu 
          :default-active="activeIndex()"
          :default-openeds="['1-1']"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="changeRouter">
          <el-submenu index="1-1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>客户管理</span>
            </template>
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">我的客户</span>
            </el-menu-item>
            <el-menu-item index="2" v-power="'allcustomer'">
              <i class="el-icon-document"></i>
              <span slot="title">全部客户</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">新增客户</span>
            </el-menu-item>
            
          </el-submenu>  
      </el-menu>
    </div>  
    <div class="main" ref="main"> 
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
      activeIndex(){
        let URL = location.href;
        let ary =['list?type=my','list?type=all','handle','visit'];
        for (let i = 0; i < ary.length; i++) {
          const element = ary[i];
          if (URL.includes(element)) return String(i+1) ;
        }
      },
      changeRouter(index){
        let i = parseInt(index);
        let URL = location.href;
        let ary =['list?type=my','list?type=all','handle'];
        if (URL.includes('handle?id=')) {    
		        location.href = location.origin + '/index/cus/handle';
        }
        if (URL.includes(ary[i-1])) return;
        this.$router.push(ary[i-1])
      }
    },
    created() {
      this.$nextTick(()=>{
        this.$refs.main.style.width = window.innerWidth - this.$refs.aside.offsetWidth + 'px';
      })
    },
   
}
</script>

<style lang="scss" scoped>
.cus{
  .aside{
    position: absolute;
    width: 204px;
    height: 100%;
    .el-menu-vertical-demo{
      height: 100%;
    }
  }
  .main{
    position: absolute;
    left: 204px;
    height: 100%;
    overflow:scroll;
  }
}  
</style>