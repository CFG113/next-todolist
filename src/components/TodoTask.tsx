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
        
      </div>
    )
  }