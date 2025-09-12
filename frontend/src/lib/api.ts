import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

class ApiClient {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ErrorResponse>) => {
        if (error.response) {
          // Server responded with a status code outside 2xx
          const { status, data } = error.response;
          
          if (status === 401) {
            // Handle unauthorized (e.g., redirect to login)
            localStorage.removeItem('token');
            window.location.href = '/login';
          }

          // You can add more specific error handling here
          return Promise.reject({
            status,
            message: data?.message || 'An error occurred',
            errors: data?.errors,
          });
        } else if (error.request) {
          // Request was made but no response was received
          return Promise.reject({
            status: 0,
            message: 'No response from server. Please check your connection.',
          });
        } else {
          // Something happened in setting up the request
          return Promise.reject({
            status: 0,
            message: error.message,
          });
        }
      }
    );
  }

  // Auth methods
  async register(userData: { name: string; email: string; password: string }) {
    const response = await this.axios.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.axios.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    return this.axios.post('/auth/logout');
  }

  getCurrentUser() {
    return this.axios.get('/auth/me');
  }

  updateProfile(userData: { name?: string; email?: string; password?: string }) {
    return this.axios.put('/auth/me', userData);
  }

  // Quiz methods
  submitQuiz(answers: Array<{ questionId: number; selectedOption: { stream: string; weight: number } }>) {
    return this.axios.post('/quiz/submit', { answers });
  }

  getQuizResults() {
    return this.axios.get('/quiz/results');
  }

  getQuizResult(id: string) {
    return this.axios.get(`/quiz/results/${id}`);
  }

  // College methods
  getColleges(params?: Record<string, any>) {
    return this.axios.get('/colleges', { params });
  }

  getCollege(id: string) {
    return this.axios.get(`/colleges/${id}`);
  }

  createCollege(data: FormData) {
    return this.axios.post('/colleges', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  updateCollege(id: string, data: FormData) {
    return this.axios.put(`/colleges/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  deleteCollege(id: string) {
    return this.axios.delete(`/colleges/${id}`);
  }

  uploadCollegePhoto(id: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.axios.put(`/colleges/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Course methods (nested under colleges)
  getCollegeCourses(collegeId: string) {
    return this.axios.get(`/colleges/${collegeId}/courses`);
  }

  getCollegeCourse(collegeId: string, courseId: string) {
    return this.axios.get(`/colleges/${collegeId}/courses/${courseId}`);
  }

  addCollegeCourse(collegeId: string, courseData: any) {
    return this.axios.post(`/colleges/${collegeId}/courses`, courseData);
  }

  updateCollegeCourse(collegeId: string, courseId: string, courseData: any) {
    return this.axios.put(`/colleges/${collegeId}/courses/${courseId}`, courseData);
  }

  deleteCollegeCourse(collegeId: string, courseId: string) {
    return this.axios.delete(`/colleges/${collegeId}/courses/${courseId}`);
  }
}

export const api = new ApiClient();
