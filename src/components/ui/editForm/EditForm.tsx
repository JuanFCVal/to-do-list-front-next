import React, { FC, useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
} from '@mui/material'

import SaveIcon from '@mui/icons-material/Save'
import { ApiService } from '../../../apis/taskApi'
import { ITask } from '../../../interfaces/task'
import { TaskContext } from '../../../context/task/TaskContext'
import { IUpdateTask } from '../../../interfaces/updateTask'
import { stringsValues } from '../../../constants/stringsValues'
import DeleteIcon from '@mui/icons-material/Delete'
interface EditFormProps {
  task: ITask
}

const EditForm: FC<EditFormProps> = ({ task }) => {
  const router = useRouter()

  const { updateTask, deleteTask } = useContext(TaskContext)

  const setTaskValuesToForm = () => {
    editForm.setFieldValue('taskName', task.taskName)
    editForm.setFieldValue('taskDescription', task.taskDescription)
  }

  useEffect(() => {
    setTaskValuesToForm()
  }, [])

  const handleDelete = async (task: ITask) => {
    deleteTask(task)
    router.push('/', undefined, { shallow: false })
  }
  const handleSubmit = async (values: IUpdateTask) => {
    try {
      const updateTaskData = {
        taskName: values.taskName,
        taskDescription: values.taskDescription,
      }
      const { data } = await ApiService.updateTask(task.id, updateTaskData)
      updateTask(data)
      router.push('/', undefined, { shallow: false })
    } catch (e) {}
  }

  const validate = (values: { taskName: string; taskDescription: string }) => {
    const errors: {
      taskName?: string
      taskDescription?: string
    } = {}
    if (!values.taskName) {
      errors.taskName = 'El nombre es obligatorio'
    }
    if (!values.taskDescription) {
      errors.taskDescription = 'La descripción es obligatoria'
    }
    return errors
  }

  const editForm = useFormik({
    initialValues: {
      taskName: '',
      taskDescription: '',
    },
    validate,
    onSubmit: async (values) => {
      handleSubmit(values)
    },
  })

  return (
    <Grid container justifyContent="center" marginTop={2}>
      <Grid item xs={12} md={6} sm={8}>
        <form onSubmit={editForm.handleSubmit}>
          <Card>
            <CardHeader title="Editar tarea" />
            <CardContent>
              <Typography variant="caption" textAlign="end">
                {' '}
                Código: {task.code}
              </Typography>
              <TextField
                id="taskName"
                type="text"
                {...editForm.getFieldProps('taskName')}
                fullWidth
                placeholder={`${stringsValues.updateTaskForm.taskNamePlaceholder}`}
                label={`${stringsValues.updateTaskForm.taskNameLabel}`}
                margin="normal"
              />
              {editForm.touched.taskName && editForm.errors.taskName ? (
                <Typography color="error">
                  {editForm.errors.taskName}
                </Typography>
              ) : null}
              <TextField
                id="taskDescription"
                type="text"
                {...editForm.getFieldProps('taskDescription')}
                fullWidth
                placeholder={`${stringsValues.updateTaskForm.taskDescriptionPlaceholder}`}
                label={`${stringsValues.updateTaskForm.taskDescriptionLabel}`}
                margin="normal"
              />
              {editForm.touched.taskDescription &&
              editForm.errors.taskDescription ? (
                <Typography color="error">
                  {editForm.errors.taskDescription}
                </Typography>
              ) : null}
            </CardContent>

            <CardActions>
              {
                <>
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<SaveIcon />}
                    fullWidth
                  >
                    {`${stringsValues.updateTaskForm.updateButton}`}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(task)}
                    startIcon={<DeleteIcon />}
                    fullWidth
                  >
                    {`Eliminar`}
                  </Button>
                </>
              }
            </CardActions>
          </Card>
        </form>
      </Grid>
    </Grid>
  )
}

export default EditForm
