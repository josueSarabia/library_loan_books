import axios from 'axios'

const BASE_URL = "http://localhost:3001/"

function get(url, options = {}) {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + url, options).then((res) => {
            resolve(res.data)
        })
        .catch((error) => {
            reject(error.response.data)
        })
    })
}

function post(url, data, options = {}) {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + url, data, options).then((res) => {
            resolve(res.data)
        })
        .catch((error) => {
            reject(error.response.data)
        })
    })
}

function put(url, data, options = {}) {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + url, data, options).then((res) => {
            resolve(res.data)
        })
        .catch((error) => {
            reject(error.response.data)
        })
    })
}

function httpDelete(url, options = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + url, options).then((res) => {
            resolve(res.data)
        })
        .catch((error) => {
            reject(error.response.data)
        })
    })
}

export { get, post, put, httpDelete }