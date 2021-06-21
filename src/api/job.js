import axios from './index';
export function jobList(params) {
    return axios.get('/job/list').then(res => {
        if (parseInt(res.code) === 0) {            
            return res
        }
        return Promise.reject(res.codeText)
    })
}

export function jobInfo(params) {
    return axios.get('/job/info',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return res.data
        }
        return Promise.reject(res.codeText)
    })
}

export function addJobData(params) {
    return axios.post('/job/add',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
}

export function editJobData(params) {
    return axios.post('/job/update',params).then(res => {
        if (parseInt(res.code) === 0) {
            return true
        }
        return Promise.reject(res.codeText)
    })
}

export function deleteData(params) {
    return axios.get('/job/delete',{
        params
    }).then(res => {
        if (parseInt(res.code) === 0) {
            return res
        }
        return Promise.reject(res.codeText)
    })
}