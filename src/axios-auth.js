import axios from 'axios'

const instance = axios.create({
    // Deployment URL
    //baseURL: 'http://51.83.185.78:8080/app'

    // Production URL
    baseURL: 'http://localhost:8080/'
})

export default instance