import axiosInstance from '@/lib/axios';
import { TasksResponse, Task, CreateTaskDTO, UpdateTaskDTO } from '@/types';

export const taskService = {
  getTasks: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const response = await axiosInstance.get<TasksResponse>('/tasks', { params });
    return response.data;
  },

  getTaskById: async (id: string) => {
    const response = await axiosInstance.get<{ success: boolean; data: Task }>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (data: CreateTaskDTO) => {
    const response = await axiosInstance.post<{ success: boolean; message: string; data: Task }>('/tasks', data);
    return response.data;
  },

  updateTask: async (id: string, data: UpdateTaskDTO) => {
    const response = await axiosInstance.patch<{ success: boolean; message: string; data: Task }>(`/tasks/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/tasks/${id}`);
    return response.data;
  },

  toggleTaskStatus: async (id: string) => {
    const response = await axiosInstance.patch<{ success: boolean; message: string; data: Task }>(`/tasks/${id}/toggle`);
    return response.data;
  },
};