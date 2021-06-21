<template>
  <div class="job">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="职位描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 3, maxRows: 9}"></el-input>
      </el-form-item>
      <el-form-item label="拥有权限" prop="power">
        <el-checkbox-group  v-model="ruleForm.power" >
          <el-checkbox v-for="(item, index) in checkList" :key="index" :label='item.label'> 
            {{item.txt}} </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { jobInfo,addJobData,editJobData } from '@/api/job'
export default {
  data() {
    return {
      ruleForm: {
        name:'',
        desc:'',
        power:[]
      },
      checkList: [
        {label:'userhandle',txt:'员工操作权'},{label:'departhandle',txt:'部门操作权'},
        {label:'jobhandle',txt:'职务操作权'},{label:'departcustomer',txt:'部门全部客户'},
        {label:'allcustomer',txt:'公司全部客户'},{label:'resetpassword',txt:'重置密码'}
      ],
      rules: {
        name:[
          {required: true, message: '请输入客户姓名',trigger: 'blur' }
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let id = this.$route.query.id;
          let { name,desc,power } = this.ruleForm;
          power = power.join('|');
          let params = id ? { jobId:id,name,desc,power } : { name,desc,power };
          (id ? editJobData : addJobData)(params).then(res=>{
            this.$alert( (id ? '更新' : '新增') + '一条职位信息','系统提示',{
              callback: ()=>{
                this.$router.push('job')
              }
            })
          })
        } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    let id = this.$route.query.id;
    let params = {jobId:id};
    id ? jobInfo(params).then(res=>{
      let { name,desc,power } = res;
      power = power.split('|');
      this.ruleForm = { name,desc,power }
    }) : null;
  },
}   
</script>

<style lang="scss" scoped>
.job{
  padding: 20px;
  width: 500px;
}  
</style>