import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { TaskCard } from './TaskCard'
import { contextValue } from '../../../utils/fixtures'

describe('TaskContainer', () => {
  const tasks = contextValue.tasks

  it.each(tasks)(
    'should render a card with Name, Detail and Created Date',
    (task) => {
      const { getByText } = render(<TaskCard task={task} />)
      expect(getByText(task.taskName)).toBeInTheDocument()
      expect(getByText(task.taskDescription)).toBeInTheDocument()
      expect(getByText(task.createdAt)).toBeInTheDocument()
    }
  )

  it('should have an edit Icon if status is different to Finished', () => {
    const task = {
      id: '63cafaec9554e7518c8a2565',
      code: 'task-2',
      status: { id: 1, name: 'En proceso' },
      taskName: 'Tarea frontal',
      taskDescription: 'Utilizar proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:37',
    }
    const { getByTestId } = render(<TaskCard task={task} />)
    expect(getByTestId('ModeEditOutlineIcon')).toBeInTheDocument()
  })

  it('should not show edit icon if status is equal to finished', () => {
    const task = {
      id: '63cafaec9554e7518c8a2565',
      code: 'task-2',
      status: { id: 2, name: 'Finalizada' },
      taskName: 'Tarea frontal',
      taskDescription: 'Utilizar proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:37',
    }
    const component = render(<TaskCard task={task} />)
    expect(
      component.queryByTestId('ModeEditOutlineIcon')
    ).not.toBeInTheDocument()
  })

  it('should call ondrag with task id value', async () => {
    const task = {
      id: '63cafaec9554e7518c8a2565',
      code: 'task-2',
      status: { id: 0, name: 'Creada' },
      taskName: 'Tarea frontal',
      taskDescription: 'Utilizar proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:37',
    }
    const component = render(<TaskCard task={task} />)
    const element = component.getByLabelText('drag-div')
    const dataTransfer = { setData: jest.fn() }
    fireEvent.dragStart(element, { dataTransfer })
    await waitFor(() => {
      expect(dataTransfer.setData).toHaveBeenCalledWith('text', task.id)
    })
  })
})
