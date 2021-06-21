<template>
  <div class="depart">
    <el-table ref="multipleTable" :data="result.data" border style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        min-width="20%">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="描述"
        min-width="40%"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column  
        label="操作"
        min-width="30%">
        <template slot-scope="scope">
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteData } from '@/api/depart'
export default {
  data() {
    return {
      result:{}
    }
  },
  watch:{
    ['$store.state.departList'](val){
      this.result = val
    }
  },
  methods: {
    onceVuex(){
      this.$store.dispatch('queryDepartList')
    },
    deleteClick(row){
      let params = { departmentId: row.id}
      deleteData(params).then(res=>{
        this.$alert('您要删除这条信息吗？','系统提示',{
          callback: ()=>{
            this.onceVuex()
          }
        })
      })
    },
    editClick(row){
      this.$router.push(`departAdd?id=${row.id}`)
    }
  },
  created() {
    this.onceVuex()
  }
}
</script>

<style lang="scss" scoped>
.depart{
  padding-top: 20px;    
}
</style>