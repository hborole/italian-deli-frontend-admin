import axios from 'axios';

const axiosInstance = ({ url, method, body }) =>
  axios({
    url: `${process.env.REACT_APP_BACKEND_URL}${url}`,
    method: method || 'GET',
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
  });

export default axiosInstance;
