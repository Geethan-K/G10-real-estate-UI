import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials:true,
    timeout: 5000,
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        localStorage.clear();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  export default apiClient;