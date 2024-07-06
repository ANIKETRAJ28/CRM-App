import axios from "axios";

const axiosConfig = axios.create();

axiosConfig.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axiosConfig.defaults.timeout = import.meta.env.VITE_API_TIME_OUT;

export default axiosConfig;