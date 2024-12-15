'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoTask from './TodoTask';

export default function TodoList() {
    const { todos, task, setTask, addTodo, updateTodo, deleteTodo } = useTodos();

    const handleAddTodo = async () => {
        await addTodo(task); 
    }

    const handleUpdateTodo = (taskId: number) => {
        const updatedName = prompt(
            'Update Task',
            todos.find((todo) => todo.id === taskId)?.task
        );
        if (updatedName) {
            updateTodo(taskId, updatedName)
        }
    };

    const handleDeleteTodo = (taskId: number) => {
        deleteTodo(taskId)
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>

            {/* Input for adding new tasks */}
            <div className="mb-4">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a new task"
                    className="border p-2 rounded w-full text-black"
                />
                <button
                    onClick={handleAddTodo}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                    Add Task
                </button>
            </div>

            {/* Render the list of todos */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className="flex items-center mb-4 space-x-4">
                        <TodoTask task={todo} />
                        <button
                            onClick={() => handleUpdateTodo(todo.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
