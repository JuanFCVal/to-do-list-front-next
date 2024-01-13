import { ITask, ITaskStatus } from '../../interfaces/task'
import { TaskState } from './TaskProvider'
type TaskActionType =
  | { type: 'Task - Refresh Tasks'; payload: ITask[] }
  | { type: 'Task - Refresh Status'; payload: ITaskStatus[] }
  | { type: 'Task - Add new task'; payload: ITask }
  | { type: 'Task - Update task'; payload: ITask }
  | { type: 'Task - Delete task'; payload: ITask }
export const taskReducer = (
  state: TaskState,
  action: TaskActionType
): TaskState => {
  switch (action.type) {
    case 'Task - Refresh Tasks':
      return {
        ...state,
        tasks: action.payload,
      }
    case 'Task - Refresh Status':
      return {
        ...state,
        status: action.payload,
      }
    case 'Task - Add new task':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    case 'Task - Update task':
      const updateTask = state.tasks.find(
        (task) => task.id === action.payload.id
      )
      return {
        ...state,
        tasks: updateTask
          ? state.tasks.map((task) =>
              task.id === action.payload.id ? action.payload : task
            )
          : [action.payload],
      }
    case 'Task - Delete task':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      }
    default:
      return state
  }
}
