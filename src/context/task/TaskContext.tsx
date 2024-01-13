import { ITask, ITaskStatus } from '@/interfaces/task'
import { createContext } from 'react'
export interface ContextProps {
  tasks: ITask[]
  status: ITaskStatus[]
  refreshTasksStatus: (status: ITaskStatus[]) => void
  refreshTasks: (tasks: ITask[]) => void
  addTask: (task: ITask) => void
  updateTask: (task: ITask) => void
  deleteTask: (task: ITask) => void
}
export const TaskContext = createContext<ContextProps>({} as ContextProps)
