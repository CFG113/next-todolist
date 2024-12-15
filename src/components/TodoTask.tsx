'use client';

export type Task = {
    id: number;
    task: string;
    is_complete: boolean;
}
  
  export default function TodoTask({
    task,
  }: {
    task: Task;
  }) {
    return (
      <div>
        <li key={task.id} className="flex items-center mb-4 space-x-4">
            {/* Display task */}
            <span className="flex-grow">{task.task}</span>

            {/* Update Button */}
            <button

                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Update
            </button>

            {/* Delete Button */}
            <button

                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Delete
            </button>
        </li>
      </div>
    )
  }