'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoTask from './TodoTask';

export default function TodoList() {
    const { todos, task, error, setTask, addTodo, updateTodo, deleteTodo } = useTodos();

    return (
        <div>
            <h1 className='flex items-center justify-center text-6xl'>Todo List</h1>
            
            {/* Display Error */}
            {error && (
                <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Input for adding new tasks */}
            <div className='flex items-center justify-center mt-40'>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a new task"
                    className='rounded-lg text-black w-1/2 p-3'
                />
                <button
                    onClick={() => addTodo(task)}
                    className='bg-blue-500 text-white rounded-lg p-3 ml-10'
                >
                    Add Task
                </button>
            </div>

            {/* Render the list of todos */}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <TodoTask
                            task={todo}
                            onUpdate={updateTodo} 
                            onDelete={deleteTodo}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
