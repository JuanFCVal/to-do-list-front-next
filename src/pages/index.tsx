import {
  Button,
  Card,
  Grid,
  Typography,
  CardContent,
  CircularProgress,
} from '@mui/material'
import { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'

import MainLayout from '../components/Layouts/MainLayout'
import { TaskContext } from '../context/task/TaskContext'
import { ApiService } from '../apis/taskApi'
import TaskFilter from '../components/ui/taskFilter/Taskfilter'
import TaskView from '../components/ui/taskView/TaskView'
import { UIContext } from '../context/ui/UIContext'

const HomePage: NextPage = () => {
  const { tasks, status, refreshTasksStatus, refreshTasks } =
    useContext(TaskContext)
  const { tasksLoading, updateTasksLoading } = useContext(UIContext)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      updateTasksLoading(true)
      const [status, tasks] = await Promise.all([
        ApiService.getTasksStatus(),
        ApiService.getAllTasks(),
      ])
      refreshTasksStatus(status.data)
      refreshTasks(tasks.data.tasks)
      updateTasksLoading(false)
    } catch (e) {
      updateTasksLoading(false)
      setShowError(true)
    }
  }
  const errorData = {
    message: 'Ocurrió un error al cargar los datos',
    action: 'Reintentar',
  }
  return (
    <MainLayout>
      {!showError ? (
        <>
          <Grid container padding={4}>
            <TaskFilter></TaskFilter>
            {tasksLoading ? (
              <CircularProgress />
            ) : tasks.length > 0 ? (
              <TaskView status={status}></TaskView>
            ) : (
              <>
                {!tasksLoading && (
                  <Typography variant="h5" component="div">
                    {'No hay tareas para mostrar'}
                  </Typography>
                )}
              </>
            )}
          </Grid>
        </>
      ) : (
        <>
          <Card variant="outlined">
            <Typography variant="h5" component="div">
              {errorData.message}
            </Typography>

            <CardContent>
              <Button onClick={loadInitialData}>{errorData.action}</Button>
            </CardContent>
          </Card>
        </>
      )}
    </MainLayout>
  )
}
export const getServerSideProps = () => {
  console.log('Get server side props'), console.log(process.env.API_URL)
  return {
    props: {},
  }
}

export default HomePage
