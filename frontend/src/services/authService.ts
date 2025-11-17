import axiosInstance from '@/lib/axios';
import { AuthResponse } from '@/types';

export const authService = {
  register: async (email: string, password: string, name?: string) => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: async (refreshToken: string) => {
    const response = await axiosInstance.post('/auth/logout', {
      refreshToken,
    });
    return response.data;
  },
};