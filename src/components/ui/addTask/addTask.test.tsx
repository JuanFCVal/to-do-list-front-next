import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import NewTask from './AddTask'
import { UIContext } from '../../../context/ui/UIContext'
import { uiContextInitalValue, contextValue } from '../../../utils/fixtures'
import { TaskContext } from '../../../context/task/TaskContext'
import { ApiService } from '../../../apis/taskApi'

const uIContextValue = {
  newTaskIsOpen: true,
  showNewTask: jest.fn(),
}
const newTask = {
  code: 'tarea-2',
  taskName: 'Configurar Next con Material UI',
  taskDescription: 'Material UI',
}

describe('NewTask', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call showNewTask when Agregar tarea is clicked', () => {
    const component = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <NewTask />
      </UIContext.Provider>
    )
    const button = component.getByText('Agregar tarea')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(uiContextInitalValue.showNewTask).toHaveBeenCalled()
  })

  it('should call showNewTask when Close Icon Button is clicked', () => {
    const component = render(
      <UIContext.Provider value={uIContextValue}>
        <NewTask />
      </UIContext.Provider>
    )
    const button = component.getByLabelText(/Cerrar formulario de nueva tarea/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    waitFor(() => {
      expect(uiContextInitalValue.showNewTask).toHaveBeenCalled()
    })
  })

  it('should show 3 texfields for Code, Title, Description and a Save Button when state is true', () => {
    const component = render(
      <UIContext.Provider value={uIContextValue}>
        <NewTask />
      </UIContext.Provider>
    )
    expect(component.getByLabelText(/código/i)).toBeInTheDocument()
    expect(component.getByLabelText(/título/i)).toBeInTheDocument()
    expect(component.getByLabelText(/descripción/i)).toBeInTheDocument()
    expect(component.getByText(/Guardar/i)).toBeInTheDocument()
  })

  it('should disable save button when Code or TaskName,or Taskscription are empty', () => {
    const component = render(
      <UIContext.Provider value={uIContextValue}>
        <NewTask />
      </UIContext.Provider>
    )
    const saveBtt = component.getByText(/Guardar/i)
    expect(saveBtt).toBeDisabled()
  })

  it('should enable save button when Code, TaskName,and TaskDescription are filled', () => {
    const component = render(
      <UIContext.Provider
        value={{
          newTaskIsOpen: true,
          showNewTask: jest.fn(),
        }}
      >
        <NewTask />
      </UIContext.Provider>
    )
    const codeInput = component.getByPlaceholderText(/Código de la tarea/)
    const taskNameInput = component.getByPlaceholderText(/Leer/i)
    const taskDescriptionInput = component.getByPlaceholderText(
      /Descripción de la tarea/i
    )
    expect(codeInput).toHaveValue('')
    expect(taskNameInput).toHaveValue('')
    expect(taskDescriptionInput).toHaveValue('')
    fireEvent.change(codeInput, { target: { value: '123' } })
    fireEvent.change(taskNameInput, { target: { value: 'Leer libro' } })
    fireEvent.change(taskDescriptionInput, {
      target: { value: 'Leer clean code' },
    })
    expect(codeInput).toHaveValue('123')
    expect(taskNameInput).toHaveValue('Leer libro')
    expect(taskDescriptionInput).toHaveValue('Leer clean code')
    const saveBtt = component.getByText(/Guardar/i)
    expect(saveBtt).toBeEnabled()
  })

  it('should call addTask from context & ApiService.createTask & search by ID when save button is pressed', async () => {
    jest.spyOn(ApiService, 'createTask').mockResolvedValue({
      statusCode: 201,
      message: 'Tarea creada exitosamente',
      data: {
        code: 'tarea-2',
        taskDescription: 'Material UI',
        taskName: 'Configurar Next con Material UI',
        statusId: 0,
        _id: '63cf2b1060b2c883c44845ff',
        createdAt: '2023-01-24T00:49:20.418Z',
        updatedAt: '2023-01-24T00:49:20.418Z',
        __v: 0,
      },
    })
    jest.spyOn(ApiService, 'getByID').mockResolvedValue({
      statusCode: 200,
      message: 'Tarea encontrada',
      data: {
        id: '63cf2b1060b2c883c44845ff',
        code: 'tarea2',
        status: {
          id: 0,
          name: 'Creada',
        },
        taskName: 'Configurar Next con Material UI',
        taskDescription: 'Material UI',
        createdAt: '23-01-2023, 19:49',
        updatedAt: '23-01-2023, 19:49',
      },
    })

    const component = render(
      <UIContext.Provider value={uIContextValue}>
        <TaskContext.Provider value={contextValue}>
          <NewTask />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    const codeInput = component.getByPlaceholderText(/Código de la tarea/)
    const taskNameInput = component.getByPlaceholderText(/Leer/i)
    const taskDescriptionInput = component.getByPlaceholderText(
      /Descripción de la tarea/i
    )
    fireEvent.change(codeInput, { target: { value: newTask.code } })
    fireEvent.change(taskNameInput, {
      target: { value: newTask.taskName },
    })
    fireEvent.change(taskDescriptionInput, {
      target: { value: newTask.taskDescription },
    })

    const saveBtt = component.getByText(/Guardar/i)
    fireEvent.click(saveBtt)
    await waitFor(() => {
      expect(contextValue.addTask).toHaveBeenCalled()
      expect(ApiService.createTask).toHaveBeenCalledWith(newTask)
      expect(ApiService.getByID).toHaveBeenCalledWith(
        '63cf2b1060b2c883c44845ff'
      )
    })
  })

  it('should show error message when createTask fails', async () => {
    jest.spyOn(ApiService, 'createTask').mockRejectedValueOnce(new Error())
    const component = render(
      <UIContext.Provider value={uIContextValue}>
        <TaskContext.Provider value={contextValue}>
          <NewTask />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    const codeInput = component.getByPlaceholderText(/Código de la tarea/)
    const taskNameInput = component.getByPlaceholderText(/Leer/i)
    const taskDescriptionInput = component.getByPlaceholderText(
      /Descripción de la tarea/i
    )
    fireEvent.change(codeInput, { target: { value: newTask.code } })
    fireEvent.change(taskNameInput, {
      target: { value: newTask.taskName },
    })
    fireEvent.change(taskDescriptionInput, {
      target: { value: newTask.taskDescription },
    })

    const saveBtt = component.getByText(/Guardar/i)
    fireEvent.click(saveBtt)
    await waitFor(() => {
      expect(
        component.getByText(
          /El código ya ha sido registrado, intenta con uno distinto./i
        )
      ).toBeInTheDocument()
    })
  })
})
