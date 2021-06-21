<template>
  <div class="cus">
    <header ref="header">
        <h1>CRM后台管理系统</h1>
        <el-menu
            :default-active="activeIndex()"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1" >组织结构</el-menu-item>
            <el-menu-item index="2" >客户管理</el-menu-item>    
        </el-menu>  
        <div class="right">
            <span ref="userInfo">欢迎：xx</span>
            <span @click="dialogVisible = true">修改密码</span>
            <span @click="exit">退出登录</span>
        </div>  
    </header> 

    <el-dialog title="重置密码" :visible.sync="dialogVisible" :before-close="handleClose">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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

    <div class="main" ref="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { queryBaseInfo,signOut,resetPassword } from '@/api/login'
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
            ruleForm: {
                pass: '',
                checkPass: '',
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        activeIndex(){
            let URL = location.href;
            let ary =["/index/org","/index/cus"];
            for (let i = 0; i < ary.length; i++) {
            const element = ary[i];
            if (URL.includes(element)) return String(i+1) ;
            }
        },
        handleSelect(index){
            let i = parseInt(index);
            let nowURL = location.href;
            let route = ["/index/org","/index/cus"];
            if (nowURL.includes(route[i-1])) return;
            this.$router.push(route[i-1])
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {password: md5(this.ruleForm.checkPass)}
                    resetPassword(params).then(res=>{
                        if (res) {
                            this.$alert('修改密码成功','系统提示',{
                                callback:()=>{
                                    this.dialogVisible = false;
                                }
                            })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        exit(){
            signOut().then(res=>{
                if (res) {
                    this.$alert('成功退出登录','系统提示',{
                        callback: ()=>{
                            this.$router.push('/login')
                        } 
                    })
                }
            })
        }  
    },                                                   
    created() {
        this.$nextTick(()=>{
            let headerH = this.$refs.header.offsetHeight;
            this.$refs.main.style.height = window.innerHeight - headerH + 'px';
            queryBaseInfo().then(data=>{
                this.$refs.userInfo.innerHTML = '欢迎：' + data.name
            })
        })
    }
}
</script>

<style lang="scss" scoped>
html,body,.cus{
  height: 100%;
  width: 100%;
}
.cus{
    header{
        display: flex; 
        justify-content: space-between;
        line-height: 60px;
        width: 100%;
        background: #545c64;
        h1{
            font-size: 28px;
            color: cornsilk;
        }
        .el-menu-demo{
            position: absolute;
            left: 280px;
            .el-menu-item{
                font-size: 20px;
            }
        }
        .right{
            font-size: 18px;
            span{
                margin-right: 40px;
            }  
        }
    }
    .main{
        position: absolute;
        width: 100%;
        top: 60px;
        left: 0;
    }
}    
</style>
