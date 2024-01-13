import { Grid } from '@mui/material'
import React, { FC, useContext } from 'react'
import { TaskContainer } from '../taskContainer/TaskContainer'
import { ITaskStatus } from '../../../interfaces/task'
import { UIContext } from '../../../context/ui/UIContext'
import { TaskList } from '../taskList/Tasklits'
import { stringsValues } from '../../../constants/stringsValues'

interface TaskViewProps {
  status: ITaskStatus[]
}
const TaskView: FC<TaskViewProps> = ({ status }) => {
  const { selectedStatus } = useContext(UIContext)

  return (
    <>
      {selectedStatus === stringsValues.filterTasks.allStatusSelectedValue ? (
        <Grid container spacing={2}>
          {status.map((status: ITaskStatus) => (
            <TaskContainer key={status.id} taskStatus={status}></TaskContainer>
          ))}
        </Grid>
      ) : (
        <TaskList></TaskList>
      )}
    </>
  )
}

export default TaskView
