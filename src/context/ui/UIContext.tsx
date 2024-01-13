import { createContext } from 'react'
export interface ContextProps {
  newTaskIsOpen: boolean
  showNewTask: (show: boolean) => void
  selectedStatus: number
  updateSelectedStatus: (statusId: number) => void
  tasksLoading: boolean
  updateTasksLoading: (show: boolean) => void
}
export const UIContext = createContext<ContextProps>({} as ContextProps)
