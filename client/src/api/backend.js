import axios from 'axios'

export default axios.create({
  // baseURL: 'http://localhost:5000',\
  baseURL: 'https://galaksija-f8jd.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});