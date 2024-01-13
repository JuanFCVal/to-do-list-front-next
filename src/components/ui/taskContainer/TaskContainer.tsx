import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  Typography,
} from '@mui/material'
import React, { FC, useContext, DragEvent } from 'react'
import { ITask, ITaskStatus } from '../../../interfaces/task'
import { TaskContext } from '../../../context/task/TaskContext'
import { TaskCard } from '../taskCard/TaskCard'
import NewTask from '../addTask/AddTask'
import { stringsValues } from '../../../constants/stringsValues'
import { ApiService } from '../../../apis/taskApi'
import { IUpdateTask } from '../../../interfaces/updateTask'

interface IPropsTaskContainer {
  taskStatus: ITaskStatus
}
export const TaskContainer: FC<IPropsTaskContainer> = ({ taskStatus }) => {
  const { tasks, updateTask } = useContext(TaskContext)
  const filteredTasks: ITask[] = tasks
    .filter((task: ITask) => task.status.id === taskStatus.id)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  const onDropEntry = async (event: DragEvent) => {
    try {
      const id = event.dataTransfer.getData('text')
      const taskUpdate: IUpdateTask = {
        statusId: taskStatus.id,
      }
      const { data } = await ApiService.updateTask(id, taskUpdate)
      updateTask(data)
    } catch (e) {}
  }

  const allowDrop = (event: DragEvent) => {
    event.preventDefault()
  }
  return (
    <>
      <Grid item xs={12} xl={4} sm={4}>
        <div
          aria-label="drag-div"
          style={{ margin: '0', padding: '0' }}
          onDragOver={allowDrop}
          onDrop={onDropEntry}
        >
          <Card
            sx={{
              borderTop: 1,
              borderColor: 'primary.main',
              overflowY: 'auto',
              height: 'calc(100vh - 100px)',
              opacity:
                filteredTasks.length === 0
                  ? stringsValues.opacityValues.low
                  : stringsValues.opacityValues.high,
            }}
          >
            <CardHeader
              title={taskStatus.name}
              sx={{ textAlign: 'center' }}
            ></CardHeader>
            <CardContent>
              {taskStatus.name === 'Creada' ? <NewTask></NewTask> : null}
              {taskStatus.id === stringsValues.finishedStatusId ? (
                <Typography fontSize="12px" color={'grey'} textAlign={'center'}>
                  Las tareas finalizadas no se pueden modificar{' '}
                </Typography>
              ) : null}

              <List sx={{ opacity: 1 }}>
                {filteredTasks.map((task) => (
                  <TaskCard task={task} key={task.id}></TaskCard>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </>
  )
}
