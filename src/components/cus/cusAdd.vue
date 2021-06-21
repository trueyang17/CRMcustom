<template>
  <div class="cusAdd">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="radio" label="0">男</el-radio>
        <el-radio v-model="radio" label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="微信" prop="weixin">
        <el-input v-model="ruleForm.weixin"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="QQ">
        <el-input v-model="ruleForm.QQ"></el-input>
      </el-form-item>
      
      <el-form-item label="客户类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
          <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="地址" prop="address" >
        <el-input type="textarea" v-model="ruleForm.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { queryCustomerInfo,editData,addData } from '@/api/custom'
export default {
  data() {
    return {
      radio: '0',
      ruleForm:{
        name:'',
        sex:'0',
        email:'',
        phone:'',
        weixin:'',
        QQ:'',
        type:'',
        address:''
      },
      options:[{
          value: '重点客户',
          label: '重点客户'
        }, {
          value: '一般客户',
          label: '一般客户'
        }, {
          value: '放弃客户',
          label: '放弃客户'
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
          QQ:[
              {required: true, message: '请输入客户QQ',trigger: 'blur' }
          ],
          weixin:[
              {required: true, message: '请输入客户微信',trigger: 'blur' }
          ],
          type:[
              { required: true, message: '请选择客户类型', trigger: 'change' }
          ],
          address:[
              { required: true, message: '请输入客户地址', trigger: 'blur' },
              { min: 3,  message: '长度至少3个字符', trigger: 'blur' }
          ],
      }
    }
  },
  methods: {
     submitForm(formName) {  
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {name,sex,email,phone,QQ,weixin,type,address} = this.ruleForm;
            let ID = this.$route.query.id ;
            let lx = this.$route.query.type;
            let params = ID ? { customerId:ID,name,sex,email,phone,QQ,weixin,type,address
            } : { name,sex,email,phone,QQ,weixin,type,address };
            (ID ? editData : addData)(params).then(res=>{
              this.$alert(( ID ? '更新':'新增') + '一条客户信息','系统提示',{
                callback: ()=>{
                  this.$router.push( (lx==='all' ? 'list?type=all' : 'list?type=my'))
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
    let ID = this.$route.query.id ;
    let params = {customerId:ID}
    ID ? queryCustomerInfo(params).then(res=>{
      let {name,sex,email,phone,QQ,weixin,type,address} = res;
      this.ruleForm = res;
    }) : null
  },
}
</script>

<style lang='scss' scoped>
.cusAdd{
  padding: 10px;
  .demo-ruleForm{
    width: 500px;
  }
}
</style>