
import { supabase } from "@/lib/supabase";

export const useTodos = () => {

    const addTodo = async(taskName: string) => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ task: taskName }])
            .select()
            .single()

        if (error) { throw new Error(`Failed to add task: ${error.message}`) }

        return data;
    }

    const getTodos = async () => {
        const { data, error } = await supabase.from('tasks').select('*')
        
        if (error) { throw new Error(`Failed to get tasks: ${error.message}`) }
        
        return data;
        
    }

    const updateTodo = async (taskId: number, updatedTaskName: string) => {
        const { data, error } = await supabase
            .from('tasks')
            .update({ task: updatedTaskName })
            .eq('id', taskId)
            .select()
            .single()

        if (error) { throw new Error(`Failed to update task: ${error.message}`) }

        return data; 
    }

    const deleteTodo = async (taskId: number) => {
        const { data, error } =  await supabase
            .from('tasks')
            .delete()
            .eq('id',taskId)
            .select()
            .single()

        if (error ) { throw new Error(`Failed to delete task: ${error.message}`) } 

        return data;
    }
    
    return { addTodo, getTodos, updateTodo, deleteTodo }
}
