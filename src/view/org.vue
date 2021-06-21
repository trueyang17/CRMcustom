<template>
  <div class="org" ref="org">
    <div class="aside" ref="aside">
      <el-menu @select="changeSelect"
        :default-active="activeIndex()"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-submenu index="1-1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>员工管理</span>
          </template>
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">员工列表</span>
          </el-menu-item>
          <el-menu-item index="2" v-power="'userhandle'">
            <i class="el-icon-document" ></i>
            <span slot="title">新增员工</span>
          </el-menu-item>
        </el-submenu>
                
        <el-submenu index="1-2" v-power="'departhandle'">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>部门管理</span>
          </template>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">部门列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title" >新增部门</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="1-3" v-power="'jobhandle'">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>职务管理</span>
          </template>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">职务列表</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-document"></i>
            <span slot="title">新增职务</span>
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
      let url = location.href;
      let ary = ['user','userAdd','depart','departAdd','job','jobAdd'];
      for (let i = 0; i < ary.length; i++) {
        const element = ary[i];
        if (url.includes(element)) return String(i+1)
      }
     
    },
    changeSelect(index){
      let i = parseInt(index);
      let url = location.href;
      let ary = ['user','userAdd','depart','departAdd','job','jobAdd'];
      this.$router.push(ary[i-1]);
    },

  },
  created() {
    this.$nextTick(()=>{
      let winW = window.innerWidth;
      this.$refs.main.style.width = winW - 204 + 'px';
    })
  },
}
</script>

<style lang="scss" scoped>
.org{
  // overflow: hidden;
  width: 100%;
  height: 100%;
  .aside{
    width: 204px;
    height: 100%;
    .el-menu-vertical-demo{
      width: 100%;
      height: 100%;
    }
  }
  
  .main{
    position: absolute;
    top: 0px;
    left: 204px;
    height: 100%;
    overflow:scroll;
  }
}

</style>