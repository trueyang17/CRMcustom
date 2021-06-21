<template>
  <div class="visit">
    <div class="table">
      <el-table :data="result"
        border  style="width: 100%">
        <el-table-column
          prop="customerName"
          label="客户姓名"
          min-width="15%">
        </el-table-column>
        <el-table-column
          prop="visitTime"
          label="日期"
          min-width="20%" 
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="visitText"
          label="回访记录"
          min-width="50%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="15%">
          <template slot-scope="scope">
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>  
    </div>
    
    <el-form :model="ruleForm"  ref="form" :rules="rules" label-width="80px" class="form">
      <el-form-item label="拜访日期" prop='visitTime'>
        <el-date-picker
          v-model="ruleForm.visitTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy/MM/dd/HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="拜访纪要" prop='visitText' class="summary">
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="ruleForm.visitText"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 

<script>
import { visitCustomerList,visitEdit,visitDelete,visitAdd,visitUpdate } from '@/api/visit'
export default {
  data() {
    return {
      result:null,
      ruleForm:{
        visitId:'',
        visitTime:'',
        visitText:'',
      },
      rules:{
          visitTime:[
              {required: true, message: '请输入回访日期和时间',trigger: 'blur' }
          ],
          visitText:[
              {required: true, message: '请输入回访内容',trigger: 'blur' }
          ],
      }
    }
  },
  methods: {
    queryData(){
      let id = this.$route.query.id;
      let params = {customerId: id};
      visitCustomerList(params).then(res=>{
        this.result = res;
      })
    },
    deleteClick(row){
      let params = {visitId: row.id}
      visitDelete(params).then(res=>{
        if (res) {
          this.$alert('您确定要删除这条回访记录吗？','系统提示',{
            callback: ()=>{
              this.queryData()
            }
          })
        }
      })
    },
    editClick(row){
      let params = {visitId: row.id}
      visitEdit(params).then(res=>{
        this.ruleForm.visitTime = res.visitTime;
        this.ruleForm.visitText = res.visitText
      })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            let id = this.$route.query.id;
            let { visitTime,visitText } = this.ruleForm;
            let params = { customerId:id ,visitText,visitTime };   
            visitAdd(params).then(res=>{
              this.$alert( '成功新增一条回访信息','系统提示',{
                callback: ()=>{
                  this.queryData()
                  this.ruleForm.visitTime = '',
                  this.ruleForm.visitText = ''
                }
              })
            })
          } 
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    } 
  },

  created() {
    let id = this.$route.query.id;
    let params = {customerId: id};
    visitCustomerList(params).then(res=>{
      this.result = res;
    });  
  },
}
</script>
<style lang="scss" scoped>
.visit{
  padding: 10px;
  width: 100%;
  display: flex;
  .table{
    width: 60%;
  }
  .form{
    width: 40%;
    margin-right: 50px;
    .summary{
      width: 100%;
    }
  }
}
</style>