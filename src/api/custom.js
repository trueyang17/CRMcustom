import axios from './index';

export function queryCustomerList(options) {
    let params = {
        lx:'my',
        type:'',  
        search:'',
        limit:10,      
        page:1 
    };  
    params = Object.assign(params,options);
    return axios.get('/customer/list',{
        params 
    }).then(res => {                                      
        let {code,codeText,data} = res
        if (parseInt(code) === 0) {
            return res
        }
        return Promise.reject(codeText)
    })
}
   
export function queryCustomerInfo(params) {
    return axios.get('/customer/info',{
        params
    }).then(res => {
        let {code,codeText,data} = res
        if (parseInt(code) === 0) {
            return data
        }
        return Promise.reject(codeText)
    })
}   

export function editData(params) { 
    return axios.post('/customer/update',params).then(res => {
        if (parseInt(res.code) === 0) {
            console.log(params.customerId)
            return true
        }
        return Promise.reject(res.codeText)
    })
    
}

export function deleteData(id) {  
    let params = {customerId: id}
    return axios.get('/customer/delete',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })

}

export function addData(params) {
    return axios.post('/customer/add',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
    
}