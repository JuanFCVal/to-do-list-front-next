export const contextValue = {
  status: [
    { id: 0, name: 'Creada' },
    { id: 1, name: 'En proceso' },
    { id: 2, name: 'Finalizada' },
  ],
  tasks: [
    {
      id: '63cafae09554e7518c8a2561',
      code: 'task-1',
      status: { id: 0, name: 'Creada' },
      taskName: 'Tarea front',
      taskDescription: 'Utilizar Next JS para crear el proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:34',
    },
    {
      id: '63cafaec9554e7518c8a2565',
      code: 'task-2',
      status: { id: 1, name: 'En proceso' },
      taskName: 'Tarea frontal',
      taskDescription: 'Utilizar proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:37',
    },
    {
      id: '63cafaf89554e7518c8a2568',
      code: 'task-3',
      status: { id: 2, name: 'Finalizada' },
      taskName: 'Tarea leer',
      taskDescription: 'Leer el libro de clean code completo',
      createdAt: '20-01-2023, 15:35',
      updatedAt: '20-01-2023, 15:37',
    },
    {
      id: '63cafb119554e7518c8a256b',
      code: 'task-4',
      status: { id: 1, name: 'En proceso' },
      taskName: 'Configurar Mongo Pipe',
      taskDescription: 'Revisar documentación de mongo y configurar',
      createdAt: '20-01-2023, 15:35',
      updatedAt: '20-01-2023, 15:35',
    },
    {
      id: '63cafb1c9554e7518c8a256e',
      code: 'task-5',
      status: { id: 0, name: 'Creada' },
      taskName: 'Configurar Docker Compose',
      taskDescription: 'Revisar documentación de Docker y configurar',
      createdAt: '20-01-2023, 15:35',
      updatedAt: '20-01-2023, 15:35',
    },
    {
      id: '63cafb3d9554e7518c8a2571',
      code: 'task-6',
      status: { id: 0, name: 'Creada' },
      taskName: 'Configurar Next con Material UI',
      taskDescription: 'Material UI',
      createdAt: '20-01-2023, 15:36',
      updatedAt: '20-01-2023, 15:36',
    },
  ],
  refreshTasksStatus: jest.fn(),
  refreshTasks: jest.fn(),
  addTask: jest.fn(),
  updateTask: jest.fn(),
}
export const contextValueWithOutTasks = {
  status: [
    { id: 0, name: 'Creada' },
    { id: 1, name: 'En proceso' },
    { id: 2, name: 'Finalizada' },
  ],
  tasks: [],
  refreshTasksStatus: jest.fn(),
  refreshTasks: jest.fn(),
  addTask: jest.fn(),
  updateTask: jest.fn(),
}
export const contextValueWithOneTask = {
  status: [
    { id: 0, name: 'Creada' },
    { id: 1, name: 'En proceso' },
    { id: 2, name: 'Finalizada' },
  ],
  tasks: [
    {
      id: '63cafae09554e7518c8a2561',
      code: 'task-1',
      status: { id: 0, name: 'Creada' },
      taskName: 'Tarea front',
      taskDescription: 'Utilizar Next JS para crear el proyecto',
      createdAt: '20-01-2023, 15:34',
      updatedAt: '20-01-2023, 15:34',
    },
  ],
  refreshTasksStatus: jest.fn(),
  refreshTasks: jest.fn(),
  addTask: jest.fn(),
  updateTask: jest.fn(),
}

export const uiContextInitalValue = {
  newTaskIsOpen: false,
  selectedStatus: -1,
  showNewTask: jest.fn(),
  updateSelectedStatus: jest.fn(),
  updateTasksLoading: jest.fn(),
  tasksLoading: false,
}
export const uiContextFinishedValue = {
  newTaskIsOpen: false,
  selectedStatus: 2,
  showNewTask: jest.fn(),
  updateSelectedStatus: jest.fn(),
  updateTasksLoading: jest.fn(),
  tasksLoading: true,
}
