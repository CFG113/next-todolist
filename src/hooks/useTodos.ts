

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Task } from '@/components/TodoTask'

export const useTodos = () => {
    const [todos, setTodos] = useState<Task[]>([])
    const [task, setTask] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getTodos = async () => {
            setLoading(true)
            const { data } = await supabase.from('tasks').select('*').throwOnError()
            
            setTodos(data || [])
            setLoading(false)
        }

        getTodos()
    }, [])
    const addTodo = async(taskName: string) => {
        setLoading(true)
        const { data } = await supabase
            .from('tasks')
            .insert([{ task: taskName }])
            .select()
            .single()
            .throwOnError()

        
        setTodos((prev) => [...prev, data])
        setTask('')
        setLoading(false)
    }

    const updateTodo = async (taskId: number, updatedTaskName: string) => {
        setLoading(true)
        const { data } = await supabase
            .from('tasks')
            .update({ task: updatedTaskName })
            .eq('id', taskId)
            .select()
            .single()
            .throwOnError()

        setTodos((prev) => prev.map((task) => (task.id === taskId ? data : task)))
        setLoading(false)
    }

    const deleteTodo = async (taskId: number) => {
        setLoading(true)
        await supabase
            .from('tasks')
            .delete()
            .eq('id',taskId)
            .throwOnError()
            
        setTodos((prev) => prev.filter((task) => task.id !== taskId))
        setLoading(false)
    }
    
    return { todos, task, setTask, loading,  addTodo, updateTodo, deleteTodo };
}
