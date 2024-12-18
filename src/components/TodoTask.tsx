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
  onUpdate: (taskId: number, updatedTaskName: string) => Promise<void>
  onDelete: (taskId: number) => Promise<void>
}) {

  const handleUpdate = async () => {
    const updatedName = prompt('Update Task', task.task);
    if (updatedName) {
      await onUpdate(task.id, updatedName)
    }
  }

  return (
    <div className="">
        <div>
            <h3>{task.task}</h3>
            <p>Completed: {task.is_complete ? 'Yes' : 'No'}</p>
        </div>
        <div className="">
            <button
                onClick={handleUpdate}
                className=""
            >
                Update
            </button>
            <button
                onClick={() => onDelete(task.id)}
                className=""
            >
                Delete
            </button>
        </div>
    </div>
  );

} 

