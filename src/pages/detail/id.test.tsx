import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import DetailPage from './[id]'
import { ApiService } from '../../apis/taskApi'
import { TaskContext } from '../../context/task/TaskContext'
import { contextValue } from '../../utils/fixtures'

jest.mock('next/router', () => ({
  useRouter: () => ({
    isReady: true,
    query: {
      id: '63cafaec9554e7518c8a2565',
    },
  }),
}))

beforeEach(() => {
  jest.spyOn(ApiService, 'getByID').mockResolvedValue({
    statusCode: 200,
    message: 'Tarea encontrada',
    data: {
      id: '63cf2b1060b2c883c44845ff',
      code: 'tarea2',
      status: {
        id: 1,
        name: 'En proceso',
      },
      taskName: 'Que aun no logro',
      taskDescription: 'Leer el libro de c',
      createdAt: '23-01-2023, 19:49',
      updatedAt: '24-01-2023, 18:43',
    },
  })
  jest.spyOn(ApiService, 'getTasksStatus').mockResolvedValue({
    statusCode: 200,
    message: 'Tarea encontrada',
    data: {
      id: '63cf2b1060b2c883c44845ff',
      code: 'tarea2',
      status: {
        id: 1,
        name: 'En proceso',
      },
      taskName: 'Que aun no logro',
      taskDescription: 'Leer el libro de c',
      createdAt: '23-01-2023, 19:49',
      updatedAt: '24-01-2023, 18:43',
    },
  })
})

describe('IDPage', () => {
  it('should call getTaskStatus and getTaskById with the id coming from routing', async () => {
    render(
      <TaskContext.Provider value={contextValue}>
        <DetailPage></DetailPage>
      </TaskContext.Provider>
    )
    await waitFor(() => {
      expect(ApiService.getTasksStatus).toHaveBeenCalled()
      expect(ApiService.getByID).toHaveBeenCalledWith(
        '63cafaec9554e7518c8a2565'
      )
    })
  })

  it('should show an error message if getTaskById fails', async () => {
    jest.spyOn(ApiService, 'getByID').mockRejectedValueOnce(new Error())

    const { getByText } = render(
      <TaskContext.Provider value={contextValue}>
        <DetailPage></DetailPage>
      </TaskContext.Provider>
    )
    await waitFor(() => {
      expect(ApiService.getByID).toHaveBeenCalled()
      expect(getByText(/No se pudo encontrar la tarea/i)).toBeInTheDocument()
    })
  })
})
