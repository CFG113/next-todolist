'use client';

export type Task = {
    id: number;
    task: string;
    is_complete: boolean;
}

export default function TodoTask({
  task,
  onUpdate,
  onDelete,
}: {
  task: Task;
  onUpdate: (taskId: number, updatedTaskName: string) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}) {

  const handleUpdate = async () => {
    const updatedName = prompt('Update Task', task.task);
    if (updatedName) {
      await onUpdate(task.id, updatedName)
    }
  }
  
  const handleDelete = async () => {  
    await onDelete(task.id)
  }

  return (
    <div className="flex items-center justify-between mb-4">
        <div>
            <h3>{task.task}</h3>
            <p>Completed: {task.is_complete ? 'Yes' : 'No'}</p>
        </div>
        <div className="flex space-x-2">
            <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Update
            </button>
            <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Delete
            </button>
        </div>
    </div>
  );

} 

