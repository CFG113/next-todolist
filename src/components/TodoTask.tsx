'use client';

import { useState } from 'react';

export type Task = {
    id: number;
    task: string;
    is_complete: boolean;
};

export default function TodoTask({
    task,
    onUpdate,
    onDelete,
}: {
    task: Task;
    onUpdate: (taskId: number, updatedTaskName: string) => Promise<void>;
    onDelete: (taskId: number) => Promise<void>;
}) {
    const [isEditing, setIsEditing] = useState(false); // Track editing state
    const [editTaskValue, setEditTaskValue] = useState(task.task); // Editable task value

    return (
        <div className="flex justify-between items-center border-b py-2">
            {isEditing ? (
                <div className="flex items-center w-full">
                    <input
                        type="text"
                        value={editTaskValue}
                        onChange={(e) => setEditTaskValue(e.target.value)} // Update input value
                        className="border p-2 rounded-lg w-full text-black"
                    />
                    <button
                        onClick={() => {
                            onUpdate(task.id, editTaskValue); // Call update function without await
                            setIsEditing(false); // Exit editing mode immediately
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)} // Cancel editing
                        className="bg-gray-300 px-4 py-2 rounded-lg ml-2"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center w-full">
                    <span>{task.task}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)} // Enable editing mode
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(task.id)} // Call delete function
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
