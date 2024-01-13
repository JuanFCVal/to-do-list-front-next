import { taskReducer } from './taskReducer'
import { contextValue } from '../../utils/fixtures'

describe('Testing task reducer', () => {
  const initialState = {
    tasks: [],
    status: [],
  }

  it('should return the initial state', () => {
    const state = taskReducer(initialState, {
      type: 'Task - Refresh Tasks',
      payload: [],
    })
    expect(state).toEqual(initialState)
  })

  it('should update tasks', () => {
    const tasks = [
      {
        id: '63cafae09554e7518c8a2561',
        code: 'task-1',
        status: { id: 0, name: 'Creada' },
        taskName: 'Tarea front',
        taskDescription: 'Utilizar Next JS para crear el proyecto',
        createdAt: '20-01-2023, 15:34',
        updatedAt: '20-01-2023, 15:34',
      },
      {
        id: '63cafae09554e7518c8a2561',
        code: 'task-1',
        status: { id: 0, name: 'Creada' },
        taskName: 'Tarea front',
        taskDescription: 'Utilizar Next JS para crear el proyecto',
        createdAt: '20-01-2023, 15:34',
        updatedAt: '20-01-2023, 15:34',
      },
      {
        id: '63cafae09554e7518c8a2561',
        code: 'task-1',
        status: { id: 0, name: 'Creada' },
        taskName: 'Tarea front',
        taskDescription: 'Utilizar Next JS para crear el proyecto',
        createdAt: '20-01-2023, 15:34',
        updatedAt: '20-01-2023, 15:34',
      },
    ]

    const state = taskReducer(initialState, {
      type: 'Task - Refresh Tasks',
      payload: tasks,
    })
    expect(state.tasks).toHaveLength(3)
    expect(state.tasks).toEqual(tasks)
  })

  it('should update task status', () => {
    const status = [
      { id: 0, name: 'Creada' },
      { id: 1, name: 'En proceso' },
      { id: 2, name: 'Finalizada' },
    ]

    const state = taskReducer(initialState, {
      type: 'Task - Refresh Status',
      payload: status,
    })
    expect(state.status).toHaveLength(3)
    expect(state.status).toEqual(status)
  })

  it('should return state with new task added', () => {
    const newTask = {
      id: '63cafae09554e7518c8a2561',
      code: 'task-1',
      status: { id: 0, name: 'Creada' },
      taskName: 'Tarea front',
      taskDescription: 'Utilizar Next JS para crear el proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:34',
    }

    const state = taskReducer(initialState, {
      type: 'Task - Add new task',
      payload: newTask,
    })
    expect(initialState.tasks.length).toBeLessThan(state.tasks.length)
  })

  it('should return state with sended task updated', () => {
    const updatedTask = {
      id: '63cafae09554e7518c8a2561',
      code: 'task-1',
      status: { id: 1, name: 'En proceso' },
      taskName: 'Tarea back',
      taskDescription: 'Utilizar MYSQL para crear el proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:34',
    }
    const currentState = {
      tasks: contextValue.tasks,
      status: contextValue.status,
    }
    const taskBeforeUpdate = currentState.tasks.find(
      (task) => task.id === updatedTask.id
    )
    expect(taskBeforeUpdate).toMatchObject({
      id: '63cafae09554e7518c8a2561',
      code: 'task-1',
      status: { id: 0, name: 'Creada' },
      taskName: 'Tarea front',
      taskDescription: 'Utilizar Next JS para crear el proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:34',
    })
    const state = taskReducer(currentState, {
      type: 'Task - Update task',
      payload: updatedTask,
    })
    const taskAfterUpdate = state.tasks.find(
      (task) => task.id === updatedTask.id
    )
    expect(taskAfterUpdate).toMatchObject(updatedTask)
  })

  it('should add to tasks list state if Tasks is empty', () => {
    const updatedTask = {
      id: '63cafae09554e7518c8a2561',
      code: 'task-1',
      status: { id: 1, name: 'En proceso' },
      taskName: 'Tarea back',
      taskDescription: 'Utilizar MYSQL para crear el proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:34',
    }

    const state = taskReducer(initialState, {
      type: 'Task - Update task',
      payload: updatedTask,
    })

    const taskAfterUpdate = state.tasks.find(
      (task) => task.id === updatedTask.id
    )
    expect(taskAfterUpdate).toBeDefined()
  })
})
