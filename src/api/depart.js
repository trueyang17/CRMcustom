import axios from './index';
export function departList(params) {
    return axios.get('/department/list').then(res => {
        if (parseInt(res.code) === 0) {            
            return res
        }
        return Promise.reject(res.codeText)
    })
}  
   
export function departInfo(params) {
    return axios.get('/department/info',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return res.data
        }
        return Promise.reject(res.codeText)
    })
}

export function addDepartData(params) {
    return axios.post('/department/add',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
}

export function editDepartData(params) {
    return axios.post('/department/update',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
}

export function deleteData(params) {
    return axios.get('/department/delete',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return res
        }
        return Promise.reject(res.codeText)
    })
}