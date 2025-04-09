import axios from 'axios';

// Create an Axios instance
const cocktailsAPI = axios.create({
    baseURL: '/api/cocktails',
    withCredentials: true
}); 

export default cocktailsAPI;