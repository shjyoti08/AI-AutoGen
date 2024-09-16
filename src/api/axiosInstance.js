import axios from 'axios';
// Create an instance of Axios with the base URL
const axiosInstance = axios.create({
  baseURL: 'https://autogen.aieducator.com/', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor to add the token to the headers

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    // console.log('Token:', token); // Debug: Check if the token is retrieved
    if (token) {
      config.headers['Authorization'] = `token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;