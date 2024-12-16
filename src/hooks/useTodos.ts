

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react"
import { Task } from '@/components/TodoTask'
import { PostgrestError } from "@supabase/supabase-js";

export const useTodos = () => {
    const [todos, setTodos] = useState<Task[]>([])
    const [task, setTask] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const getTodos = async () => {
            setLoading(true)
            try {
                const { data } = await supabase.from('tasks').select('*').throwOnError()
                setTodos(data || [])
            } catch(error) {
                console.error('Failed to get tasks:', (error as PostgrestError).message)
            } finally {
                setLoading(false)
            }
        }

        getTodos()
    }, [])

    const addTodo = async(taskName: string) => {
        setLoading(true)
        try {
            const { data } = await supabase
                .from('tasks')
                .insert([{ task: taskName }])
                .select()
                .single()
                .throwOnError()

            setTodos((prev) => [...prev, data])
            setTask('')
        } catch (error) {
            console.error('Failed to add tasks:', (error as PostgrestError).message)
        } finally {
            setLoading(false)
        }
    }

    const updateTodo = async (taskId: number, updatedTaskName: string) => {
        setLoading(true)
        try {
            const { data } = await supabase
                .from('tasks')
                .update({ task: updatedTaskName })
                .eq('id', taskId)
                .select()
                .single()
                .throwOnError()

            setTodos((prev) => prev.map((task) => (task.id === taskId ? data : task)))
        } catch(error) {
            console.error('Failed to update tasks:', (error as PostgrestError).message)
        } finally {
            setLoading(false)
        }
    }

    const deleteTodo = async (taskId: number) => {
        setLoading(true)
        try {
            await supabase
                .from('tasks')
                .delete()
                .eq('id',taskId)
                .throwOnError()
            
            setTodos((prev) => prev.filter((task) => task.id !== taskId))
        } catch (error) {
            console.error('Failed to delete tasks:', (error as PostgrestError).message)
        } finally {
            setLoading(false)
        }
    }
    
    return { todos, task, setTask, loading, addTodo, updateTodo, deleteTodo };
}
