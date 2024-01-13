import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { TaskList } from './Tasklits'
import { contextValue } from '../../../utils/fixtures'
import { TaskContext } from '../../../context/task/TaskContext'
import { TaskCard } from '../taskCard/TaskCard'

describe('TaskList', () => {
  it('should render a component with "Number of Tasks Found"', () => {
    const { getByText } = render(
      <TaskContext.Provider value={contextValue}>
        <TaskList></TaskList>
      </TaskContext.Provider>
    )
    expect(getByText(/6 Resultados encontrados/i)).toBeInTheDocument()
  })

  it.each(contextValue.tasks)(
    'should render a card with Name, Detail and Created Date',
    (task) => {
      const { getByText } = render(<TaskCard task={task} />)
      expect(getByText(task.taskName)).toBeInTheDocument()
      expect(getByText(task.taskDescription)).toBeInTheDocument()
      expect(getByText(task.createdAt)).toBeInTheDocument()
    }
  )
})
