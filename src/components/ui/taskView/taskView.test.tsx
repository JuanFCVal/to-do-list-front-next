import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import TaskView from './TaskView'
import {
  uiContextInitalValue,
  contextValue,
  uiContextFinishedValue,
} from '../../../utils/fixtures'
import { UIContext } from '../../../context/ui/UIContext'
import { TaskContext } from '../../../context/task/TaskContext'

describe('TaskView', () => {
  it('should render Kanban view if selectedStatus is "todos"', async () => {
    const { getByText } = render(
      <UIContext.Provider value={uiContextInitalValue}>
        <TaskContext.Provider value={contextValue}>
          <TaskView status={contextValue.status}></TaskView>
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    await waitFor(() => {
      expect(getByText('Creada')).toBeInTheDocument()
      expect(getByText('En proceso')).toBeInTheDocument()
      expect(getByText('Finalizada')).toBeInTheDocument()
    })
  })

  it('should render a list if selectedStatus is Finalizada', async () => {
    const { getByText } = render(
      <UIContext.Provider value={uiContextFinishedValue}>
        <TaskContext.Provider value={contextValue}>
          <TaskView status={contextValue.status}></TaskView>
        </TaskContext.Provider>
      </UIContext.Provider>
    )
    await waitFor(() => {
      expect(getByText(/6 Resultados encontrados/i)).toBeInTheDocument()
    })
  })
})
