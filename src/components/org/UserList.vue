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
      <el-input v-model="search" placeholder="请输入要搜索内容" class="search" @change="Search" ></el-input>
    </header>
    
    <div>
      <el-table ref="multipleTable" :data="result.data"  @selection-change="handleSelectionChange" border style="width: 100%">
        <el-table-column
          type="selection" >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          :formatter='formatSex'
          min-width="5%">
        </el-table-column>

        <el-table-column
          prop="department"
          label="部门"
          min-width="10%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="job"
          label="职务"
          min-width="10%"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="email"
          label="邮箱"
          min-width="15%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          min-width="15%"
          show-overflow-tooltip>
        </el-table-column>
        
        <el-table-column
          prop="desc"
          label="描述"
          min-width="20%"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="15%">
          <template slot-scope="scope">
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="resetPassword(scope.row)" type="text" size="small">修改密码</el-button> 
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <el-dialog title="密码重置" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" 
       label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/api/index'
import { userData,deleteData } from '@/api/user'
import { resetPassword } from '@/api/login'
import md5 from 'blueimp-md5'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      Id:'',
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      search:'',
      type:'',
      result:{},
      multipleSelection: [],
      options: [{
          value: 0,
          label: '全部'
        },{
          value: 1,
          label: '总裁办'
        }, {
          value: 2,
          label: '产品研发部'
        },{
          value: 3,
          label: '销售部'
        }, {
          value: 4,
          label: '后勤部'
        }, {
          value: 5,
          label: '人力资源部'
      }]
    }
  },
  methods: {
    handleClose(done){
      this.$confirm('确认关闭？').then(_ => {
        done();
      })
    },
    handleSelectionChange(val,row) {
      this.multipleSelection = val;
    },
    formatSex(item){
      return parseInt(item.sex) === 0 ? '男' : '女'
    },  
    delAry(i,ary){
      let l1 = this.multipleSelection.length;
      if(l1 <= i) return;
      let params = {userId: ary[i].id}
      console.log(params)
      deleteData(params).then(res=>{
        if (res) {
          if (l1 > i) {
            i++;
            this.delAry(i,ary)
          } 
        }
      })   

      // axios.get('/user/delete',{
      //   params
      // }).then(res => {
      //   if (parseInt(res.code) === 0) {
      //     if (l1 > i) {
      //       i++;
      //       this.delAry(i,ary)
      //     } 
      //   }
      // })
    
    },
    deleteAll(){
      let ay = this.multipleSelection;
      let l = this.multipleSelection.length;
      if (l === 0) {
        this.$alert('请先选中要删除的项再操作','系统提示')
      } else {
        this.$alert(`您要删除${l}条员工信息吗？`,'系统提示',{
          callback: ()=>{
            this.delAry(0,ay)
            this.$store.dispatch('queryUserList')
          }
        })
      }
    },
    onceVuex(){
      this.$store.dispatch('queryUserList')
    },  
    queryUserData(){
      userData({   
          departmentId: this.type,
          search: this.search,
        }).then(result=>{
          console.log(result)
          this.result.data = result.data
        })
    },
    selectType(){
      if (this.type === 0) {
        this.type = 0;
        this.queryUserData()
        return
      }
      this.queryUserData()
    },
    Search(){
      this.queryUserData()
    },
    deleteClick(row){
      let Id = row.id;
      let params = {userId:Id};
      deleteData(params).then(()=>{
        this.$alert('确定要删除这条客户信息吗','系统提示',{
          callback: ()=>{
            this.onceVuex()
          }
        })
      })
    },
    editClick(row){
      let Id = row.id;
      this.$router.push(`userAdd?id=${Id}`)
    },
    resetPassword(row){
      this.Id = row.id;
      this.dialogVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = { userId:this.Id, password: md5(this.ruleForm.checkPass) }
          resetPassword(params).then(res=>{
            if (res === true) {
              this.$alert('重置密码成功','系统提示',{
                callback: ()=>{
                  this.dialogVisible = false
                }
              })
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    ['$store.state.userList'](val){
      this.result = val
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
