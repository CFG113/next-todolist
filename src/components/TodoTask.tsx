'use client';

export type Task = {
  id: number;
  task: string;
  is_complete: boolean;
};

type TodoTaskProps = {
  task: Task;
  updateTodo: (taskId: number, updatedTaskName: string) => void;
  deleteTodo: (taskId: number) => void;
};

export default function TodoTask({ task, updateTodo, deleteTodo }: TodoTaskProps) {
  return (
    <li className="flex items-center mb-4 space-x-4">
      <div className="flex-grow">{task.task}</div>
      <button
        onClick={() => {
          const updatedName = prompt('Update Task', task.task);
          if (updatedName) {
            updateTodo(task.id, updatedName);
          }
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>
      <button
        onClick={() => deleteTodo(task.id)}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </li>
  );
}
