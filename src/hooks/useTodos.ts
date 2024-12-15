
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Task } from '@/components/TodoTask'

export const useTodos = () => {
    const [todos, setTodos] = useState<Task[]>([])
    const [task, setTask] = useState('')
    
    const addTodo = async(taskName: string) => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ task: taskName }])
            .select()
            .single()

        if (error) { throw new Error(`Failed to add task: ${error.message}`) }
        setTodos((prev) => [...prev, data])
        setTask('')

    }

    useEffect(() => {
        const getTodos = async () => {
            const { data, error } = await supabase.from('tasks').select('*')
            if (error) { throw new Error(`Failed to get tasks: ${error.message}`) }
            
            setTodos(data)
        }

        getTodos()
    }, [])

    const updateTodo = async (taskId: number, updatedTaskName: string) => {
        const { data, error } = await supabase
            .from('tasks')
            .update({ task: updatedTaskName })
            .eq('id', taskId)
            .select()
            .single()

        if (error) { throw new Error(`Failed to update task: ${error.message}`) }
        setTodos((prev) => prev.map((task) => (task.id === taskId ? data : task)))

    }

    const deleteTodo = async (taskId: number) => {
        const { error } =  await supabase
            .from('tasks')
            .delete()
            .eq('id',taskId)

        if (error ) { throw new Error(`Failed to delete task: ${error.message}`) } 
        setTodos((prev) => prev.filter((task) => task.id !== taskId))
    }
    
    return { todos, task, setTask, addTodo, updateTodo, deleteTodo };
}
