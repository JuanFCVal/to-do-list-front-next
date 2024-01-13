import { FC, useReducer } from 'react'
import { UIContext } from './UIContext'
import { uIReducer } from './uiReducer'
import { stringsValues } from '../../constants/stringsValues'

export interface UIState {
  newTaskIsOpen: boolean
  selectedStatus: number
  tasksLoading: boolean
}

const UI_INITIAL_STATE: UIState = {
  newTaskIsOpen: false,
  selectedStatus: stringsValues.filterTasks.allStatusSelectedValue,
  tasksLoading: false,
}
interface UIProviderProps {
  children: React.ReactNode
}

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uIReducer, UI_INITIAL_STATE)
  const showNewTask = (show: boolean) => {
    dispatch({ type: 'UI - showNewTask', payload: show })
  }
  const updateSelectedStatus = (status: number) => {
    dispatch({ type: 'UI - SelectedStatus', payload: status })
  }
  const updateTasksLoading = (show: boolean) => {
    dispatch({ type: 'UI - TasksLoading', payload: show })
  }
  return (
    <UIContext.Provider
      value={{
        ...state,
        showNewTask,
        updateSelectedStatus,
        updateTasksLoading,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
