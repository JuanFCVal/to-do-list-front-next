import { FC, useReducer } from 'react'
import { TaskContext } from './TaskContext'
import { taskReducer } from './taskReducer'
import { ITask, ITaskStatus } from '../../interfaces/task'

export interface TaskState {
  tasks: ITask[]
  status: ITaskStatus[]
}

const TASK_INITIAL_STATE: TaskState = {
  tasks: [],
  status: [],
}
interface TaskProviderProps {
  children: React.ReactNode
}

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, TASK_INITIAL_STATE)
  const refreshTasks = async (tasks: ITask[]) => {
    dispatch({ type: 'Task - Refresh Tasks', payload: tasks })
  }
  const refreshTasksStatus = (status: ITaskStatus[]) => {
    dispatch({ type: 'Task - Refresh Status', payload: status })
  }

  const addTask = (task: ITask) => {
    dispatch({ type: 'Task - Add new task', payload: task })
  }
  const updateTask = (task: ITask) => {
    dispatch({ type: 'Task - Update task', payload: task })
  }

  const deleteTask = (task: ITask) => {
    dispatch({ type: 'Task - Delete task', payload: task })
  }

  return (
    <TaskContext.Provider
      value={{
        ...state,
        refreshTasksStatus,
        refreshTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
