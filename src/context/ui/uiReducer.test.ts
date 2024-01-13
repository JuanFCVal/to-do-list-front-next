import { uIReducer } from './uiReducer'
import { stringsValues } from '../../constants/stringsValues'

describe('Testing uiReducer', () => {
  const initialState = {
    newTaskIsOpen: false,
    tasksLoading: false,
    selectedStatus: stringsValues.filterTasks.allStatusSelectedValue,
  }

  it('should return the initial state', () => {
    const state = uIReducer(initialState, { type: 'UI' })
    expect(state).toEqual(initialState)
  })

  it('should update addTaskIsOpen value', () => {
    const state = uIReducer(initialState, {
      type: 'UI - showNewTask',
      payload: true,
    })
    expect(state.newTaskIsOpen).toBe(true)
  })

  it('should return -1 as selectedStatus by default value', () => {
    const state = uIReducer(initialState, {
      type: 'UI',
    })
    expect(state.selectedStatus).toBe(-1)
  })

  it('should update selectedStatusID value', () => {
    const state = uIReducer(initialState, {
      type: 'UI - SelectedStatus',
      payload: 1,
    })
    expect(state.selectedStatus).toBe(1)
  })

  it('should update TasksLoading value', () => {
    const state = uIReducer(initialState, {
      type: 'UI - TasksLoading',
      payload: true,
    })
    expect(state.tasksLoading).toBe(true)
  })
})
