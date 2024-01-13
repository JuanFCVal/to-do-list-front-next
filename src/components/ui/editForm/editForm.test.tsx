import '@testing-library/jest-dom'
import { TaskContext } from '../../../context/task/TaskContext'
import EditForm from './EditForm'
import {
  render,
  waitFor,
  fireEvent,
  act,
  RenderResult,
} from '@testing-library/react'
import { contextValue } from '../../../utils/fixtures'
import { ApiService } from '../../../apis/taskApi'

jest.mock('next/router', () => ({
  useRouter: () => ({
    isReady: true,
    query: {
      id: '63cafaec9554e7518c8a2565',
    },
  }),
}))

describe('editForm', () => {
  it('should render a form with Fields for Task Name, Description, Status and a Save Button', async () => {
    let component: RenderResult
    await act(async () => {
      component = render(
        <TaskContext.Provider value={contextValue}>
          <EditForm task={contextValue.tasks[0]} />
        </TaskContext.Provider>
      )
    })
    expect(component.getByLabelText(/Nombre de la tarea/i)).toBeInTheDocument()
    expect(component.getByLabelText(/Descripción/i)).toBeInTheDocument()
    expect(component.getByText(/Actualizar/i)).toBeInTheDocument()
  })

  it('should fill textfield with task info', async () => {
    let component: RenderResult
    await act(async () => {
      component = render(
        <TaskContext.Provider value={contextValue}>
          <EditForm task={contextValue.tasks[0]} />
        </TaskContext.Provider>
      )
    })
    const taskName = await component.findByPlaceholderText(/tarea/i)
    const taskDescription = await component.findByPlaceholderText(
      /Descripción/i
    )
    expect(taskName).toHaveValue('Tarea front')
    expect(taskDescription).toHaveValue(
      'Utilizar Next JS para crear el proyecto'
    )
  })

  it('should call updateTask method in service when Update button is clicked', async () => {
    jest.spyOn(ApiService, 'updateTask').mockResolvedValue({})
    const component = render(
      <TaskContext.Provider value={contextValue}>
        <EditForm task={contextValue.tasks[0]} />
      </TaskContext.Provider>
    )
    const taskName = component.getByLabelText(/Nombre de la tarea/i)
    const taskDescription = component.getByLabelText(/Descripción/i)

    fireEvent.change(taskName, { target: { value: 'Nueva tarea' } })
    fireEvent.change(taskDescription, {
      target: { value: 'Nueva descripción' },
    })

    const updateButton = component.getByText(/Actualizar/i)

    fireEvent.click(updateButton)
    await waitFor(() => {
      expect(ApiService.updateTask).toHaveBeenCalledWith(
        '63cafae09554e7518c8a2561',
        {
          taskName: 'Nueva tarea',
          taskDescription: 'Nueva descripción',
        }
      )
    })
  })

  it('should show "El nombre es obligatorio" and "La descripción es obligatoria" if fields are empty', async () => {
    const component = render(
      <TaskContext.Provider value={contextValue}>
        <EditForm task={contextValue.tasks[0]} />
      </TaskContext.Provider>
    )
    const taskName = component.getByLabelText(/Nombre de la tarea/i)
    const taskDescription = component.getByLabelText(/Descripción/i)
    fireEvent.blur(taskName)
    fireEvent.blur(taskDescription)
    fireEvent.change(taskName, { target: { value: '' } })
    fireEvent.change(taskDescription, {
      target: { value: '' },
    })
    await waitFor(() => {
      expect(
        component.getByText(/El nombre es obligatorio/i)
      ).toBeInTheDocument()
      expect(
        component.getByText(/La descripción es obligatoria/i)
      ).toBeInTheDocument()
    })
  })
})
