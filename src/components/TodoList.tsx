'use client';

import { useTodos } from '@/hooks/useTodos';
import TodoTask from './TodoTask';

export default function TodoList() {
    const { todos, task, error, setTask, addTodo, updateTodo, deleteTodo } = useTodos();

    return (
        <div>
            <h1 className="">Todo List</h1>
            
            {/* Display Error */}
            {error && (
                <div className="bg-red-500 text-white p-2 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Input for adding new tasks */}
            <div className="">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a new task"
                    className=""
                />
                <button
                    onClick={() => addTodo(task)}
                    className=""
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
