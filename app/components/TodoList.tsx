import { useState } from 'react'
import { Task } from '../types'

interface TodoListProps {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
  darkMode: boolean
}

export default function TodoList({ tasks, setTasks, darkMode }: TodoListProps) {
  const [newTask, setNewTask] = useState('')

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className={`w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 transition-all duration-300`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>To-Do List</h2>
      <form onSubmit={addTask} className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className={`w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </form>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className={`flex items-center justify-between p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-all duration-300`}>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mr-2"
              />
              <span className={`${task.completed ? 'line-through' : ''} ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className={`text-red-500 hover:text-red-700 transition-colors duration-300`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

