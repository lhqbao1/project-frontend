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

const getDoctor = (limit) => {
    return axios.get(`/api/get-doctor?limit=${limit}`)
}

const getAllDoctor = () => {
    return axios.get(`/api/get-all-doctors`)
}

const createDoctorInfoService = (data) => {
    return axios.post('/api/save-info-doctor', data)
}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`api/get-info-doctor?id=${inputId}`)
}
const saveBulkSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getScheduleDoctorByDate = (doctorID, date) => {
    return axios.get(`api/get-schedule-doctor-by-date?doctorID=${doctorID}&date=${date}`)
}
const getMoreInforDoctorById = (doctorID) => {
    return axios.get(`/api/get-more-info-doctor-by-id?doctorID=${doctorID}`)
}
const getProfileDoctorById = (doctorID) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorID=${doctorID}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty')
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}
const getAllClinic = () => {
    return axios.get('/api/get-all-clinic')
}
const getDetailClinicById = (data) => {
    return axios.get(`/api/get-clinic-by-id?id=${data.id}`)
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}



export {
    handleLoginApi, getAllUser, createNewUser, deleteUser,
    editUserService, getAllCodeService, getDoctor, getAllDoctor,
    createDoctorInfoService, getDetailInfoDoctor, saveBulkSchedule,
    getScheduleDoctorByDate, getMoreInforDoctorById, getProfileDoctorById,
    postPatientBookAppointment, postVerifyBookAppointment, createNewSpecialty,
    getAllSpecialty, getDetailSpecialtyById, createNewClinic, getAllClinic,
    getDetailClinicById, getAllPatientForDoctor
}