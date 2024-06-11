import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://osbaseleaf-api.andolasoft.co.in/v1/', // Replace with your API base URL
  timeout: 1000, // Optional timeout setting
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;