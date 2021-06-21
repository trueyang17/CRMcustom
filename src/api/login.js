import axios from './index.js';

export function Login(account,password) {
    let params = {account,password}
    return axios.post('/user/login',params).then(res => {
        let {code,power} = res;
        if (parseInt(code) === 0) {
            return power
        }
        return Promise.reject(res.codeText)
    })
}
  
export function queryPower() {
    return axios.get('/user/power').then(res=>{
        if (parseInt(res.code) === 0) {
            return res.power
        }
        return Promise.reject(res.codeText)
    })
}   
  
export function checkLogin(){
    return axios.get('/user/login').then(res=>{
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(false)
    })
}

export function queryBaseInfo(){
    return axios.get('/user/info').then(res=>{
        let {code,data,codeText} = res;
        if (parseInt(code) === 0) {
            return data
        }
        return Promise.reject(codeText)
    })
}   

export function signOut(){
    return axios.get('/user/signout').then(res=>{
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
}     

export function resetPassword(params) {
    return axios.post('/user/resetpassword',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
}