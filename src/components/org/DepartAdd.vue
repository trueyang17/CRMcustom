<template>
  <div class="depart">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="部门描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 3, maxRows: 9}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { departInfo,addDepartData,editDepartData } from '@/api/depart'
export default {
  data() {
    return {
      ruleForm: {
        name:'',
        desc:''
      },
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
          let { name ,desc } = this.ruleForm;
          let params = id ? { departmentId:id,name ,desc }  : { name ,desc }; 
          (id ? editDepartData : addDepartData )(params).then(res=>{
            this.$alert( (id ? '更新' : '新增') + '一条信息','系统提示',{
              callback: ()=>{
                this.$router.push('depart')
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
    let params = {departmentId:id};
    id ? departInfo(params).then(res=>{
      let { name,desc } = res;
      console.log(name,desc)
      this.ruleForm = { name,desc }
    }) : null
  },
  beforeRouteUpdate (to, from, next) {
    this.ruleForm = {  }
    next()
  }
}
</script>

<style lang="scss" scoped>
.depart{
  padding: 20px;
  width: 500px;
}
</style>