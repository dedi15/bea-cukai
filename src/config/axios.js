import axios from 'axios'
const baseURL = process.env.REACT_APP_BASEURL
axios.defaults.baseURL = baseURL
export default axios