import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grow,
  Button,
  Typography,
} from '@mui/material'
import React, { DragEvent, FC, useContext } from 'react'
import { ITask } from '../../../interfaces/task'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import Link from 'next/link'
import { stringsValues } from '../../../constants/stringsValues'
import DeleteIcon from '@mui/icons-material/Delete'
import { TaskContext } from '@/context/task/TaskContext'
interface TTaskCardProps {
  task: ITask
}

export const TaskCard: FC<TTaskCardProps> = ({ task }) => {
  const { deleteTask } = useContext(TaskContext)

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData('text', task.id)
  }
  const handleDelete = async (task: ITask) => {
    deleteTask(task)
  }

  return (
    <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
      <Card
        aria-label="drag-div"
        key={task.id}
        sx={{ marginTop: 2, backgroundColor: '#212121', transition: 'all .5s' }}
        draggable={task.status.id !== stringsValues.finishedStatusId}
        onDragStart={onDragStart}
      >
        <CardActionArea>
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" gutterBottom>
                {task.taskName}
              </Typography>
              {/* <Button
                variant="contained"
                onClick={() => handleDelete(task)}
                startIcon={<DeleteIcon />}
                fullWidth
              >
                {`Eliminar`}
              </Button> */}
              {task.status.id !== stringsValues.finishedStatusId && (
                <Link href={`/detail/${task.id}`}>
                  <ModeEditOutlineIcon color={'primary'} />
                </Link>
              )}
            </Box>
            <Typography variant="body2">{task.taskDescription}</Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {task.createdAt}
            </Typography>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grow>
  )
}
