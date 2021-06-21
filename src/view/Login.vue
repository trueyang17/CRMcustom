<template>
  <div class="login">
    <h1>CRM后台管理系统</h1>
    <el-form :model="ruleForm" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="account">
            <el-input type="text" v-model="ruleForm.account" prefix-icon="el-icon-user-solid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-view" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import { Login } from '@/api/login'
export default {
    data() {
        // let validateName = (rule, value, callback) => {
        //     if(!/1\d{10}/.test(value)){
        //             callback(new Error('请输入合法用户名,手机号或邮箱'));
        //     } 
        // };
        // let validatePassword = (rule, value, callback) => {
        //     if(!/^\w{6,16}$/.test(value)){
        //         callback(new Error('请输入合法密码,至少六位数'));
        //     } 
        // };
        return {
            ruleForm:{
                account:'',
                password:''
            }
        }
    },
    methods: {
        submitForm(formName) {
            let { account,password } = this.ruleForm;
            password = md5(password);
            Login(account,password).then(()=>{
                this.$alert('欢迎进入系统','系统提示',{
                    callback:()=>{
                        this.$router.push('/index')
                    }
                })
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
}
</script>

<style lang="scss" scoped>
html,body,.login{
    width: 100%;
    height: 50%;
    position: absolute;
    background: cornflowerblue;
}
.login{
    h1{
        font-size: 50px;
        text-align: center;
        margin-top: 100px;
    }
   .demo-ruleForm{
       width: 500px;
       position: absolute;
       top: 100%;
       left: 50%;
       transform: translate(-55%,-20%);
   } 
}   
</style>
