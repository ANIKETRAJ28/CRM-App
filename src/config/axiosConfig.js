import axios from "axios";

const axiosConfig = axios.create();

axiosConfig.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000/crmapp/api/v1';
// axiosConfig.defaults.timeout = import.meta.env.VITE_API_TIME_OUT;

export default axiosConfig;