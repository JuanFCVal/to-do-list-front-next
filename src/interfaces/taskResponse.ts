import { ITask } from './task'

export interface ITaskResponse {
  statuscode: number
  message: string
  data: {
    count: number
    tasks: ITask[]
  }
}
