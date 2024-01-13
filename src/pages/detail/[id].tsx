import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { ApiService } from '../../apis/taskApi'
import { ITask } from '../../interfaces/task'
import EditForm from '../../components/ui/editForm/EditForm'
import { TaskContext } from '../../context/task/TaskContext'
import MainLayout from '../../components/Layouts/MainLayout'

const DetailPage = () => {
  const { refreshTasksStatus } = useContext(TaskContext)
  const [showError, setShowError] = useState(false)

  const loadStatus = async () => {
    const { data } = await ApiService.getTasksStatus()
    refreshTasksStatus(data)
  }
  const getTaskDetail = async (id: string) => {
    try {
      const { data }: { data: ITask } = await ApiService.getByID(id)
      setTask(data)
    } catch (e) {
      setShowError(true)
    }
  }
  const [task, setTask] = useState<ITask>()

  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query
      loadStatus()
      getTaskDetail(id as string)
    }
  }, [router.isReady])
  return (
    <MainLayout title="Editar tarea">
      {showError && <p>No se pudo encontrar la tarea</p>}
      {task && <EditForm task={task}></EditForm>}
    </MainLayout>
  )
}
export default DetailPage
