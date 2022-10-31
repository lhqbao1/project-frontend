//package dung de gui request len server
import axios from '../axios';

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUser = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data)

}

const deleteUser = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    //inputData is this.state
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/allcode?type=${inputType}`)
}
export { handleLoginApi, getAllUser, createNewUser, deleteUser, editUserService, getAllCodeService }