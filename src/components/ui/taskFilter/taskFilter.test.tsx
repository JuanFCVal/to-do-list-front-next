import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskFilter from './Taskfilter'
import { TaskContext } from '../../../context/task/TaskContext'
import {
  contextValue,
  contextValueWithOutTasks,
  uiContextFinishedValue,
  uiContextInitalValue,
} from '../../../utils/fixtures'
import { ApiService } from '../../../apis/taskApi'
import { UIContext } from '../../../context/ui/UIContext'

describe('TaskFilter', () => {
  it('Should be define', () => {
    const { getByPlaceholderText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValue}>
          <TaskFilter />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    expect(getByPlaceholderText(/Nombre o descripción/i)).toBeInTheDocument()
  })

  it.only('Should update textfield value', async () => {
    const { getByPlaceholderText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValue}>
          <TaskFilter />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    const input = getByPlaceholderText(/Nombre o descripción/i)
    console.log(input)
    userEvent.type(input, 'Task')

    await waitFor(() => {
      expect(input).toHaveValue('Task')
    })
  })

  it('Should display a select with -1 value as default"', async () => {
    const { getByPlaceholderText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValueWithOutTasks}>
          <TaskFilter />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    const select = getByPlaceholderText(/Seleccionar estado/i)
    expect(select).toHaveValue(`-1`)
  })

  it('Should call ApiService.getFilterTask and refreshTasks  after text or select change', async () => {
    jest.spyOn(ApiService, 'getFilterTask').mockResolvedValue({
      statuscode: 200,
      message: 'Tasks fetched successfully',
      data: {
        tasks: [],
        count: 0,
      },
    })
    const { getByPlaceholderText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValueWithOutTasks}>
          <TaskFilter />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    const input = getByPlaceholderText(/Nombre o descripción/i)
    userEvent.type(input, 'Task')
    await waitFor(() => {
      expect(ApiService.getFilterTask).toHaveBeenCalledTimes(1)
      expect(ApiService.getFilterTask).toHaveBeenCalledTimes(1)
      expect(contextValueWithOutTasks.refreshTasks).toHaveBeenCalled()
    })
  })

  it('Should set select value to the value that is set in UIContext', async () => {
    const { getByPlaceholderText } = render(
      <UIContext.Provider value={uiContextFinishedValue}>
        <TaskContext.Provider value={contextValueWithOutTasks}>
          <TaskFilter />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    const select = getByPlaceholderText(/Seleccionar estado/i)
    expect(select).toHaveValue(`${uiContextFinishedValue.selectedStatus}`)
  })

  it('Should render 3 options when select is clicked', () => {
    const { getByPlaceholderText, getAllByRole } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValueWithOutTasks}>
          <TaskFilter />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    const select = getByPlaceholderText(/Seleccionar estado/i)
    userEvent.click(select)
    const options = getAllByRole('option')
    expect(options).toHaveLength(3)
  })
})
