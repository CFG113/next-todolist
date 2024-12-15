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
        <h3>{task.task}</h3>
        <p>Completed: {task.is_complete ? 'Yes' : 'No'}</p>
      </div>
    )
  }