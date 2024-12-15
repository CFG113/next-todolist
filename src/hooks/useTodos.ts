
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Task } from '@/components/TodoTask'

export const useTodos = () => {
    const [todos, setTodos] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<string>('');
    
    const addTodo = async(taskName: string) => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ task: taskName }])
            .select()
            .single()

        if (error) { throw new Error(`Failed to add task: ${error.message}`) }
        setTodos((prev) => [...prev, data])
        setNewTask('')

    }

    const getTodos = async () => {
        const { data, error } = await supabase.from("tasks").select("*")
        if (error) { throw new Error(`Failed to get tasks: ${error.message}`) }
        setTodos(data || [])
    }

    useEffect(() => {
        getTodos()
    }, []);

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
    
    return { todos, newTask, setNewTask, addTodo, updateTodo, deleteTodo }
}
