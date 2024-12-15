'use client';

import { useEffect, useState } from 'react';
import TodoTask, { Task } from './TodoTask';
import { useTodos } from '@/hooks/useTodos';

export default function TodoList() {
    const { addTodo, getTodos, updateTodo, deleteTodo } = useTodos()
    const [todos, setTodos] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        const loadTodos = async () => {
            const data = await getTodos();
            setTodos(data)
        };

        loadTodos()
    }, [])
    
    const addNewTodo = async () => {
        const newTodo = await addTodo(newTask);
        setTodos((prevTodos) => [...prevTodos, newTodo])
        setNewTask('') // Clears the input
    }

    const updateTodoTask = async (taskId: number, updatedTaskName: string) => {
        const updatedTask = await updateTodo(taskId, updatedTaskName)
        setTodos((prevTodos) => prevTodos.map((task) => (task.id === taskId ? updatedTask : task)))
    }

    const removeTodoTask = async (taskId: number) => {
        await deleteTodo(taskId);
        setTodos((prevTodos) => prevTodos.filter((task) => task.id !== taskId))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>

            {/* Input for adding new tasks */}
            <div className="mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"
                    className="border p-2 rounded w-full text-black"
                />
                <button
                    onClick={addNewTodo}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Add Task
                </button>
            </div>

            {/* Render the list of todos */}
            <ul>
                {todos.map((task) => (
                    <li key={task.id} className="flex items-center mb-4 space-x-4">
                        {/* Editable input field on clicking the Update button */}
                        <div className="flex items-center">
                            <TodoTask task={task} />

                            {/* Show input to edit the task */}
                            <button
                                onClick={() => {
                                    const updatedName = prompt(
                                        'Update Task',
                                        task.task
                                    ); // Prompt for input
                                    if (updatedName) {
                                        updateTodoTask(task.id, updatedName);
                                    }
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => removeTodoTask(task.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
      
}