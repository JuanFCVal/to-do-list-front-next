import { UIState } from './UIProvider'

type UIActionType =
  | { type: 'UI' }
  | { type: 'UI - showNewTask'; payload: boolean }
  | { type: 'UI - SelectedStatus'; payload: number }
  | { type: 'UI - TasksLoading'; payload: boolean }
export const uIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - showNewTask':
      return {
        ...state,
        newTaskIsOpen: action.payload,
      }
    case 'UI - SelectedStatus':
      return {
        ...state,
        selectedStatus: action.payload,
      }
    case 'UI - TasksLoading':
      return {
        ...state,
        tasksLoading: action.payload,
      }
    default:
      return state
  }
}
