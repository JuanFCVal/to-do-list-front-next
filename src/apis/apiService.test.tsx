import axios from 'axios'
import { ApiService } from './taskApi'

jest.mock('axios')

describe('ApiService', () => {
  it('Calls the GET Task Status Method as expected', async () => {
    const response = {
      statusCode: 200,
      data: [
        {
          id: 0,
          name: 'Creada',
        },
        {
          id: 1,
          name: 'En proceso',
        },
        {
          id: 2,
          name: 'Finalizada',
        },
      ],
    }
    const baseURL = 'http://mocked.url'
    axios.create.mockImplementation(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          data: response,
        })
      ),
    }))
    ApiService.api = axios.create({ baseURL })
    return ApiService.getTasksStatus().then((res) => {
      expect(res).toMatchObject(response)
    })
  })

  it('Calls the GET Tasks Method as expected', async () => {
    const response = {
      statusCode: 200,
      message: 'Tareas encontradas',
      data: {
        count: 4,
        tasks: [
          {
            id: '63cafae09554e7518c8a2561',
            code: 'task-1',
            status: {
              id: 1,
              name: 'En proceso',
            },
            taskName: 'Tarea front con react',
            taskDescription: 'Utilizar Next JS para crear el proyecto',
            createdAt: '20-01-2023, 15:34',
            updatedAt: '26-01-2023, 02:43',
          },
          {
            id: '63cafb1c9554e7518c8a256e',
            code: 'task-5',
            status: {
              id: 1,
              name: 'En proceso',
            },
            taskName: 'Configurar Docker Compose',
            taskDescription: 'Revisar documentación de Docker y configurar',
            createdAt: '20-01-2023, 15:35',
            updatedAt: '26-01-2023, 02:29',
          },
          {
            id: '63ced0d672c258713df9e798',
            code: 'task-7',
            status: {
              id: 1,
              name: 'En proceso',
            },
            taskName: 'Configurar Next con cualquiera menos con material',
            taskDescription: 'next UI',
            createdAt: '23-01-2023, 13:24',
            updatedAt: '26-01-2023, 01:29',
          },
          {
            id: '63d17b419943f195986090b4',
            code: 'code.-2',
            status: {
              id: 1,
              name: 'En proceso',
            },
            taskName: 'Lectura dia de hoy mijo',
            taskDescription: 'leer un nuevo libro',
            createdAt: '25-01-2023, 13:56',
            updatedAt: '26-01-2023, 02:42',
          },
        ],
      },
    }
    const baseURL = 'http://mocked.url'
    axios.create.mockImplementation(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          data: response,
        })
      ),
    }))
    ApiService.api = axios.create({ baseURL })
    return ApiService.getAllTasks().then((res) => {
      expect(res).toMatchObject(response)
    })
  })

  it('Calls the GET Tasks By Id as expected', async () => {
    const response = {
      statusCode: 200,
      message: 'Tarea encontrada',
      data: {
        id: '63cf2b1060b2c883c44845ff',
        code: 'tarea2',
        status: {
          id: 0,
          name: 'Creada',
        },
        taskName: 'Actividad en proceso creo',
        taskDescription: 'Leer el libro de c++',
        createdAt: '23-01-2023, 19:49',
        updatedAt: '26-01-2023, 02:43',
      },
    }
    const baseURL = 'http://mocked.url'
    axios.create.mockImplementation(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          data: response,
        })
      ),
    }))
    ApiService.api = axios.create({ baseURL })
    return ApiService.getByID('63cf2b1060b2c883c44845ff').then((res) => {
      expect(res).toMatchObject(response)
    })
  })

  it('Calls the GET FilterTasks as expected', async () => {
    const response = {
      statusCode: 200,
      message: 'Tareas encontradas',
      data: {
        count: 1,
        tasks: [
          {
            id: '63d17b419943f195986090b4',
            code: 'code.-2',
            status: {
              id: 1,
              name: 'En proceso',
            },
            taskName: 'Lectura dia de hoy mijo',
            taskDescription: 'leer un nuevo libro',
            createdAt: '25-01-2023, 13:56',
            updatedAt: '26-01-2023, 02:42',
          },
        ],
      },
    }
    const baseURL = 'http://mocked.url'
    axios.create.mockImplementation(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          data: response,
        })
      ),
    }))
    ApiService.api = axios.create({ baseURL })
    return ApiService.getFilterTask({ query: 'libro', status: 1 }).then(
      (res) => {
        expect(res).toMatchObject(response)
      }
    )
  })

  it('Calls the POST InsertTask as expected', async () => {
    const response = {
      statusCode: 200,
      message: 'Tareas encontradas',
      data: {
        statusCode: 201,
        message: 'Tarea creada exitosamente',
        data: {
          code: 'tarea3',
          taskDescription: 'Material UI',
          taskName: 'Configurar Next',
          statusId: 0,
          _id: '63d26149d8c0f2a596b5b267',
          createdAt: '2023-01-26T11:17:29.098Z',
          updatedAt: '2023-01-26T11:17:29.098Z',
          __v: 0,
        },
      },
    }
    const baseURL = 'http://mocked.url'
    axios.create.mockImplementation(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          data: response,
        })
      ),
      post: jest.fn(() =>
        Promise.resolve({
          data: response,
        })
      ),
    }))
    ApiService.api = axios.create({ baseURL })
    return ApiService.createTask({
      taskName: 'Configurar Next',
      taskDescription: 'Material UI',
      code: 'tarea3',
    }).then((res) => {
      expect(res).toMatchObject(response)
    })
  })

  it('Calls the Update Task as expected', async () => {
    const response = {
      statusCode: 200,
      message: 'Tarea actualizada',
      data: {
        id: '63cafaec9554e7518c8a2565',
        code: 'task-2',
        status: {
          id: 0,
          name: 'Creada',
        },
        taskName: 'Crear proyecto to_do front',
        taskDescription: 'Utilizar Next JS para crear el proyecto',
        createdAt: '20-01-2023, 15:34',
        updatedAt: '26-01-2023, 06:19',
      },
    }
    const baseURL = 'http://mocked.url'
    axios.create.mockImplementation(() => ({
      put: jest.fn(() =>
        Promise.resolve({
          data: response,
        })
      ),
    }))
    ApiService.api = axios.create({ baseURL })
    return ApiService.updateTask('63cafaec9554e7518c8a2565', {
      statusId: 0,
      taskName: 'Crear proyecto to_do front',
      taskDescription: 'Utilizar Next JS para crear el proyecto',
    }).then((res) => {
      expect(res).toMatchObject(response)
    })
  })
})
