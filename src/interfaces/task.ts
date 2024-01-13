export interface ITask {
  code: string
  createdAt: string
  id: string
  taskDescription: string
  taskName: string
  updatedAt: string
  status: ITaskStatus
}

export interface ITaskStatus {
  id: number
  name: string
}
