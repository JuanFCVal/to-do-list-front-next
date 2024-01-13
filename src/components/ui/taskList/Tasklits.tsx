import { Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { TaskContext } from '../../../context/task/TaskContext'
import { TaskCard } from '../taskCard/TaskCard'

export const TaskList = () => {
  const { tasks } = useContext(TaskContext)
  return (
    <>
      <Typography>{tasks.length} Resultados encontrados</Typography>
      <br />
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid key={task.id} item xs={6} md={3} sm={4} xl={4}>
            <TaskCard task={task}></TaskCard>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
