import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from './index'
import { TaskContext } from '../context/task/TaskContext'
import { ApiService } from '../apis/taskApi'
import { UIContext } from '../context/ui/UIContext'
import {
  uiContextFinishedValue,
  contextValue,
  contextValueWithOutTasks,
  uiContextInitalValue,
} from '../utils/fixtures'

describe('HomePage', () => {
  beforeEach(() => {
    jest.spyOn(ApiService, 'getAllTasks').mockResolvedValue({
      statuscode: 200,
      message: 'Tasks fetched successfully',
      data: {
        tasks: [],
        count: 0,
      },
    })
    jest.spyOn(ApiService, 'getTasksStatus').mockResolvedValue({
      statuscode: 200,
      message: 'Tasks fetched successfully',
      data: {
        status: [
          { id: 0, name: 'Creada' },
          { id: 1, name: 'En proceso' },
          { id: 2, name: 'Finalizada' },
        ],
      },
    })
    jest.spyOn(ApiService, 'getFilterTask').mockResolvedValue({})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render HomePage with Navbar', async () => {
    const screen = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValue}>
          <HomePage />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    const nav = await screen.findByText(/To Do List/i)
    expect(nav).toBeInTheDocument()
  })

  it('should show 3 cards with Creada, En Proceso y Terminada titles', async () => {
    const { getByText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValue}>
          <HomePage />
        </TaskContext.Provider>
      </UIContext.Provider>
    )

    await waitFor(() => {
      expect(getByText('Creada')).toBeInTheDocument()
      expect(getByText('En proceso')).toBeInTheDocument()
      expect(getByText('Finalizada')).toBeInTheDocument()
    })
  })

  it('should call refreshTasksStatus, refreshTasks one time', async () => {
    render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValue}>
          <HomePage />
        </TaskContext.Provider>
      </UIContext.Provider>
    )

    await waitFor(() => {
      expect(contextValue.refreshTasksStatus).toHaveBeenCalled()
      expect(contextValue.refreshTasks).toHaveBeenCalled()
      expect(ApiService.getAllTasks).toHaveBeenCalled()
      expect(ApiService.getAllTasks).toHaveBeenCalled()
    })
  })

  it('should show a Retry button if ApiService Fails', async () => {
    jest.spyOn(ApiService, 'getTasksStatus').mockRejectedValueOnce(new Error())
    jest.spyOn(ApiService, 'getAllTasks').mockRejectedValueOnce(new Error())

    const { getByText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValue}>
          <HomePage />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    await waitFor(() => {
      expect(getByText(/Reintentar/i)).toBeInTheDocument()
    })
  })

  it('should have a searchbar', () => {
    const { getByPlaceholderText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValue}>
          <HomePage />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    expect(getByPlaceholderText(/Nombre o descripción/i)).toBeInTheDocument()
  })

  it('should show  "No hay tareas para mostrar if tasks is empty', () => {
    const { getByText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValueWithOutTasks}>
          <HomePage />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    expect(getByText(/No hay tareas para mostrar/i)).toBeInTheDocument()
  })

  it('should show spinner if UIContext is loading', () => {
    const { getByRole } = render(
      <UIContext.Provider value={uiContextFinishedValue}>
        <TaskContext.Provider value={contextValueWithOutTasks}>
          <HomePage />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    expect(getByRole('progressbar')).toBeInTheDocument()
  })
})
