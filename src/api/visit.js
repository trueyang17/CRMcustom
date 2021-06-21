import axios from './index';
//获取回访信息列表
export function visitCustomerList(params) {
    return axios.get('/visit/list',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return res.data    
        }
        return Promise.reject(res.codeText)
    })
};
//编辑回访信息
export function visitEdit(params) {
    return axios.get('/visit/info',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return res.data
        }
        return Promise.reject(res.codeText)
    })
}
//删除回访信息
export function visitDelete(params) {
    return axios.get('/visit/delete',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
}   
//增加回访信息
export function visitAdd(params) {
    return axios.post('/visit/add',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
}
//更新回访信息
export function visitUpdate(params) {
    return axios.post('/visit/update',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true  
        }    
        return Promise.reject(res.codeText)
    })
}