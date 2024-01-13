import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TaskContext } from '../../../context/task/TaskContext'
import { contextValue } from '../../../utils/fixtures'
import { TaskContainer } from './TaskContainer'
import { UIContext } from '../../../context/ui/UIContext'

describe('TaskContainer', () => {
  it('should should show the title "Creada" and task-2, task-4', () => {
    const taskStatus = { id: 0, name: 'Creada' }
    const { getByText } = render(
      <TaskContext.Provider value={contextValue}>
        <TaskContainer taskStatus={taskStatus} />
      </TaskContext.Provider>
    )
    expect(getByText('Tarea front')).toBeInTheDocument()
    expect(getByText('Configurar Docker Compose')).toBeInTheDocument()
    expect(getByText('Configurar Next con Material UI')).toBeInTheDocument()
    expect(getByText('Creada')).toBeInTheDocument()
  })

  it('should should show the title "En proceso" and task-1, task-5, task-6', () => {
    const taskStatus = { id: 1, name: 'En proceso' }
    const { getByText } = render(
      <TaskContext.Provider value={contextValue}>
        <TaskContainer taskStatus={taskStatus} />
      </TaskContext.Provider>
    )
    expect(getByText('Configurar Mongo Pipe')).toBeInTheDocument()
    expect(getByText('Tarea frontal')).toBeInTheDocument()
    expect(getByText('En proceso')).toBeInTheDocument()
  })

  it('should should show the title "Finalizada" and task-3', () => {
    const taskStatus = { id: 2, name: 'Finalizada' }
    const { getByText } = render(
      <TaskContext.Provider value={contextValue}>
        <TaskContainer taskStatus={taskStatus} />
      </TaskContext.Provider>
    )
    expect(getByText('Tarea leer')).toBeInTheDocument()
    expect(getByText('Finalizada')).toBeInTheDocument()
  })

  it('should show "Agregar tarea" button if container has title "Creada', () => {
    const taskStatus = { id: 0, name: 'Creada' }
    const { getByText } = render(
      <TaskContext.Provider value={contextValue}>
        <TaskContainer taskStatus={taskStatus} />
      </TaskContext.Provider>
    )
    expect(getByText('Creada')).toBeInTheDocument()
    expect(getByText('Agregar tarea')).toBeInTheDocument()
  })

  it('should show "new task form" if newTaskIsOpen in context is true', () => {
    const taskStatus = { id: 0, name: 'Creada' }
    const { getByText } = render(
      <UIContext.Provider
        value={{ newTaskIsOpen: true, showNewTask: jest.fn() }}
      >
        <TaskContext.Provider value={contextValue}>
          <TaskContainer taskStatus={taskStatus} />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    expect(getByText('Nueva tarea')).toBeInTheDocument()
  })

  it('should show "Las tareas finalizadas no se pueden modificar if status is finished', () => {
    const taskStatus = { id: 2, name: 'Finalizada' }
    const { getByText } = render(
      <UIContext.Provider
        value={{ newTaskIsOpen: true, showNewTask: jest.fn() }}
      >
        <TaskContext.Provider value={contextValue}>
          <TaskContainer taskStatus={taskStatus} />
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    expect(
      getByText(/Las tareas finalizadas no se pueden modificar/i)
    ).toBeInTheDocument()
  })
})
