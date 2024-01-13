import { ICreateTask } from './../interfaces/createTask'
import { ITaskResponse } from '@/interfaces/taskResponse'
import axios, { AxiosInstance } from 'axios'
import { IUpdateTask } from '../interfaces/updateTask'
import { stringsValues } from '../constants/stringsValues'
export class ApiService {
  public static api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })

  public static async getAllTasks() {
    const response = await this.api.get<ITaskResponse>('/task')
    return response.data
  }
  public static async getTasksStatus() {
    const response = await this.api.get('/task/status')
    return response.data
  }

  public static async createTask(task: ICreateTask) {
    const response = await this.api.post('/task', task)
    return response.data
  }

  public static async getByID(id: string) {
    const response = await this.api.get(`/task/${id}`)
    return response.data
  }
  public static async updateTask(id: string, dataUpdateTask: IUpdateTask) {
    const response = await this.api.put(`/task/${id}`, dataUpdateTask)
    return response.data
  }

  public static async getFilterTask({
    query,
    status,
  }: {
    query: string
    status?: number
  }) {
    let queryFilter = ''
    status !== stringsValues.filterTasks.allStatusSelectedValue &&
      (queryFilter += `statusId=${status}`)
    query.length > 0 && (queryFilter += `&search=${query}`)
    const response = await this.api.get(`/task/?${queryFilter}`)
    return response.data
  }
}
