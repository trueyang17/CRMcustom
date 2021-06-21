import axios from './index';

export function userData(params) {
    return axios.get('/user/list',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return res
        }
        return Promise.reject(res.codeText)
    })   
}
   
export function userInfoData(params) {
    return axios.get('/user/info',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return res.data
        }
        return Promise.reject(res.codeText)
    })
}

export function addData(params) {
    return axios.post('/user/add',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
} 

export function editData(params) {
    return axios.post('/user/update',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
} 

export function deleteData(params) {
    return axios.get('/user/delete',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
} 