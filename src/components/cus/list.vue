<template>
  <div class="list">
    <header>
      <el-button type="info" class="btn" @click="deleteAll">全部删除</el-button>
      <el-select class="select" v-model="type" placeholder="请选择" @change="selectType">
        <el-option 
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="search" placeholder="请输入要搜索内容" class="search" @change="Search"
      ></el-input>
    </header>
    <div>
      <el-table ref="multipleTable" :data="result.data" @selection-change="handleSelectionChange"  border style="width: 100%">
        <el-table-column
          type="selection"
          ref="select" >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="8%">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          :formatter='formatSex'
          min-width="5%">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          min-width="8%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          min-width="8%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="weixin"
          label="微信"
          min-width="8%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="QQ"
          label="QQ"
          min-width="8%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="所属人"
          min-width="8%">
        </el-table-column>
        <el-table-column
          prop="type"
          label="客户类型"
          min-width="8%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          min-width="15%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="15%">
          <template slot-scope="scope">
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="visitClick(scope.row)" type="text" size="small">回访记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="parseInt(result.total)"
          :current-page='parseInt(result.page)'
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/api/index';
import { queryCustomerList,deleteData } from '@/api/custom'
export default {
  data() {
    return {
      search:'',
      type:'',
      limit:10,
      page:1,
      total:0,
      result:{},
      multipleSelection: [],
      aryId:[],
      options: [{
          value: '全部客户',
          label: '全部客户'
        }, {
          value: '重点客户',
          label: '重点客户'
        }, {
          value: '一般客户',
          label: '一般客户'
        }, {
          value: '放弃客户',
          label: '放弃客户'
      }]
    }
  },  
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    formatSex(item){
      return parseInt(item.sex) === 0 ? '男' : '女'
    },  
    delAry(index,ary){
      let l = this.multipleSelection.length;
      if (index >= l) return;
      let Id = ary[index].id; 
      let params = {customerId: Id};
      axios.get('/customer/delete',{
        params   
      }).then(res => {
        if (parseInt(res.code) === 0) {
          if (index < l) {
              index++;
              this.delAry(index,ary) 
          }
        }
      })

    },    
    deleteAll(){
      let ay = this.multipleSelection; 
      let l = this.multipleSelection.length;
      if (l === 0) {
        this.$alert('请先选中要删除的项再操作','系统提示')
      } else {
        this.$alert(`您要删除${l}条客户信息吗？`,'系统提示',{
          callback: ()=>{
              this.delAry(0,ay);
              this.onceVuex()
          }
        })
      }
    }, 
    onceVuex(){
      let lx = this.$route.query.type || 'my'; 
      this.$store.dispatch('queryCustomerList',{lx})
    },  
    queryCusData(){
      let lx = this.$route.query.type || 'my';
      queryCustomerList({   
          lx,
          type: this.type,
          search: this.search,
          limit: this.limit,
          page: this.page
        }).then(result=>{
          this.result = result
        })
    }, 
    selectType(){
      this.page = 1;
      if (this.type === '全部客户') {
        this.type = null;
        this.queryCusData()
        return
      }
      this.queryCusData()
    },
    Search(){
      this.page = 1;
      this.queryCusData()
    },
    deleteClick(row){
      console.log(row)
      let Id = row.id;
      deleteData(Id).then(()=>{
        this.$alert('确定要删除这条客户信息吗','系统提示',{
          callback: ()=>{
            this.queryCusData()
          }
        })
      })
    },
    editClick(row){
      console.log(row)
      let Id = row.id;
      let lx = this.$route.query.type || 'my'; 
      this.$router.push(`handle?type=${lx}&id=${Id}`)
    },
    visitClick(row){
      let Id = row.id;
      this.$router.push(`visit?id=${Id}`)
    },
    handleCurrentChange(val) {
      this.page = val;
      this.queryCusData()
    }

  },
  watch: {
    //接收从vuex传来的数据
    ['$store.state.myList'](val){
      this.result = val
    },
    ['$store.state.allList'](val){
      this.result = val
    },
    //路由切换数据
    ['$route'](val){
      this.onceVuex()
    }
  },
  created() {
    this.onceVuex() 
  },
}
</script>

<style lang='scss' scoped>
.list{
  header{
    display: flex;
    float: right;
    margin: 10px ;
    .select{
      width: 120px;
      margin: 0 10px 0 10px;
    }
    .search{
      width: 180px;
      margin-right: 100px;
    }
  }
  .page{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>