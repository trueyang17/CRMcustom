<template>
  <div class="userAdd">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="ruleForm.sex" label="0">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="1">女</el-radio>
      </el-form-item>    
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentId">
        <el-select v-model="ruleForm.departmentId" placeholder="请选择部门">
          <el-option v-for="(item, index) in Depart" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职务" prop="jobId">
        <el-select v-model="ruleForm.jobId" placeholder="请选择职务">
          <el-option v-for="(item, index) in Job" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="desc" >
        <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userInfoData,editData,addData } from '@/api/user'
export default {
  data() {
    return {
      radio: '0',
      ruleForm:{
        name:'',
        sex:'0',
        email:'',
        phone:'',
        departmentId:'',
        jobId:'',
        department:'',
        job:'',
        desc:''
      },
      Depart:[{
          value: '1',
          label: '总裁办'
        }, {
          value: '2',
          label: '产品研发部'
        }, {
          value: '3',
          label: '销售部'
        }, {
          value: '4',
          label: '后勤部'
        }, {
          value: '5',
          label: '人力资源部'
      }],
      Job:[{
          value: '1',
          label: '总裁办员工'
        }, {
          value: '2',
          label: '研发部员工'
        }, {
          value: '3',
          label: '销售部员工'
        }, {
          value: '4',
          label: '后勤部员工'
        }, {
          value: '5',
          label: '人资部员工'
      }],
      rules:{
          name:[
              {required: true, message: '请输入客户姓名',trigger: 'blur' }
          ],
          email:[
              {required: true, message: '请输入客户邮箱',trigger: 'blur' }
          ],
          phone:[
              {required: true, message: '请输入客户电话',trigger: 'blur' }
          ],
          departmentId:[
              { required: true, message: '请选择客户类型', trigger: 'change' }
          ],
          jobId:[
              { required: true, message: '请选择客户类型', trigger: 'change' }
          ],
          desc:[
              { required: true, message: '请输入客户地址', trigger: 'blur' },
              { min: 3,  message: '长度至少3个字符', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
     submitForm(formName) {
        let {name,sex,email,phone,departmentId, jobId,desc} = this.ruleForm;
        sex = parseFloat(sex)
        let params = { name,sex,email,phone,departmentId, jobId,desc};
        console.log( params)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {name,sex,email,phone,departmentId,jobId,desc} = this.ruleForm;
            let ID = this.$route.query.id ;
            let params = ID ? { userId:ID,name,sex,email,phone,departmentId,jobId,desc} : { name,sex,email,phone,departmentId,jobId,desc};  
            (ID ? editData(params) : addData(params)).then(res=>{
              this.$alert(( ID ? '更新':'新增') + '一条员工信息','系统提示',{
                callback: ()=>{
                  this.$router.push('user')
                }
              })
            })  
          } else {
            this.$alert('您输入的数据没有通过规则验证请重新输入','系统提示')
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
 
  created() {
    let ID = this.$route.query.id ;
    let params = {userId:ID}
    ID ? userInfoData(params).then(res=>{
      this.ruleForm = res;
    }) : null
  },
  beforeRouteUpdate (to, from, next) {
    this.ruleForm = {}
    next()
  },
}
</script>

<style lang='scss' scoped>
.userAdd{
  padding: 10px;
  .demo-ruleForm{
    width: 500px;
  }
}
</style>