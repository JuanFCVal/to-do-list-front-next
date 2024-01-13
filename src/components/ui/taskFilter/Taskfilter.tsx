import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ApiService } from '../../../apis/taskApi'
import { TaskContext } from '../../../context/task/TaskContext'
import { stringsValues } from '../../../constants/stringsValues'
import { UIContext } from '../../../context/ui/UIContext'

const TaskFilter = () => {
  const debounce_time = 500
  const [queryValue, setQueryValue] = useState('')
  const { selectedStatus, updateSelectedStatus, updateTasksLoading } =
    useContext(UIContext)
  const [statusValue, setStatusValue] = useState(selectedStatus)
  const { status, refreshTasks } = useContext(TaskContext)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getFilteredTask()
    }, debounce_time)
    return () => clearTimeout(timeoutId)
  }, [queryValue, statusValue])

  const handleQueryFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryValue(e.target.value)
    updateTasksLoading(true)
  }
  const handleStatusFilter = async (event: SelectChangeEvent) => {
    if (statusValue === Number(event.target.value)) return
    setStatusValue(Number(event.target.value))
    updateSelectedStatus(Number(event.target.value))
    updateTasksLoading(true)
  }

  const getFilteredTask = async () => {
    const { data } = await ApiService.getFilterTask({
      query: queryValue,
      status: statusValue,
    })
    refreshTasks(data.tasks)
    updateTasksLoading(false)
  }

  return (
    <>
      <Grid container marginBottom={2}>
        <Grid item xs={6} md={6} lg={3}>
          <TextField
            label="Buscar"
            placeholder="Nombre o descripción"
            onChange={handleQueryFilter}
            value={queryValue}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={6} lg={2} paddingLeft={4} paddingRight={4}>
          <FormControl fullWidth>
            <InputLabel>Estados</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              aria-label="estado de la tarea"
              value={`${statusValue}`}
              label="Seleccionar estado"
              placeholder="Seleccionar estado"
              onChange={handleStatusFilter}
            >
              <MenuItem
                value={stringsValues.filterTasks.allStatusSelectedValue}
              >
                {stringsValues.filterTasks.allStatusSelectedLabel}
              </MenuItem>
              {status.map((status) => (
                <MenuItem
                  aria-label={status.name}
                  key={status.id}
                  value={status.id}
                >
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default TaskFilter
