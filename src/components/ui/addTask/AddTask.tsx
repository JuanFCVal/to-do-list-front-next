import {
  Box,
  TextField,
  Button,
  FormControl,
  Card,
  CardContent,
  IconButton,
  CardHeader,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { UIContext } from '../../../context/ui/UIContext'
import { ApiService } from '../../../apis/taskApi'
import Snackbar from '@mui/material/Snackbar'
import { TaskContext } from '../../../context/task/TaskContext'
import { stringsValues } from '../../../constants/stringsValues'

const NewTask = () => {
  const { newTaskIsOpen, showNewTask } = useContext(UIContext)
  const { addTask } = useContext(TaskContext)
  const [code, setCode] = useState('')
  const [taskName, setTaskname] = useState('')
  const [taskDescription, setDescription] = useState('')
  const [showSnack, setShowSnack] = useState(false)
  const updateShowNewTask = () => {
    showNewTask(!newTaskIsOpen)
  }

  const createTask = async () => {
    const newTask = {
      code,
      taskName,
      taskDescription,
    }
    try {
      const { data } = await ApiService.createTask(newTask)
      const { _id } = data
      getTaskById(_id)
    } catch (error) {
      setShowSnack(true)
    }
  }

  const getTaskById = async (id: string) => {
    const { data } = await ApiService.getByID(id)
    addTask(data)
    updateShowNewTask()
    setCode('')
    setTaskname('')
    setDescription('')
  }

  return (
    <>
      <Snackbar
        open={showSnack}
        onClose={() => setShowSnack(false)}
        autoHideDuration={1500}
        message={stringsValues.errorMsgCodeInUSe}
      />
      {newTaskIsOpen ? (
        <Box
          sx={{
            marginBottom: 2,
            padding: 2,
          }}
        >
          <Card variant="outlined">
            <Box display="flex" justifyContent="end">
              <IconButton
                aria-label="Cerrar formulario de nueva tarea"
                onClick={updateShowNewTask}
                size="large"
              >
                <HighlightOffIcon color={'error'} />
              </IconButton>
            </Box>
            <CardHeader title="Nueva tarea" sx={{ margin: 0 }}>
              {' '}
            </CardHeader>
            <CardContent>
              <Box marginBottom={2}>
                <FormControl>
                  <TextField
                    required
                    id="outlined-required"
                    value={code}
                    label="Código"
                    placeholder="Código de la tarea"
                    onChange={(e) => setCode(e.target.value)}
                  />{' '}
                </FormControl>
              </Box>
              <Box marginBottom={2}>
                <FormControl>
                  <TextField
                    required
                    id="outlined-required"
                    value={taskName}
                    onChange={(e) => setTaskname(e.target.value)}
                    label="Título"
                    placeholder="Leer"
                  />{' '}
                </FormControl>
              </Box>
              <Box marginBottom={2}>
                <FormControl>
                  <TextField
                    required
                    multiline
                    value={taskDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    id="outlined-required"
                    label="Descripción"
                    placeholder="Descripción de la tarea"
                  />{' '}
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="end">
                <Box sx={{ p: 1 }}></Box>
                <Button
                  variant="contained"
                  endIcon={<SaveIcon></SaveIcon>}
                  disabled={
                    code.length === 0 ||
                    taskName.length === 0 ||
                    taskDescription.length === 0
                  }
                  onClick={createTask}
                >
                  {stringsValues.saveBtt}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="info"
          fullWidth
          endIcon={<AddIcon></AddIcon>}
          onClick={updateShowNewTask}
        >
          {stringsValues.addTaskBtt}
        </Button>
      )}
    </>
  )
}

export default NewTask
