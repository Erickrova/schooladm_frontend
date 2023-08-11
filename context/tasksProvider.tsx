import { createContext } from "react";
import { Auth, Task, TaskSent } from "../helpers/interfaces";

const TasksContext = createContext<any|null>(null)

const TasksProvider = ({children}:any) =>{

    //* GET functions

    const getTask = async (id:string):Promise<Task> =>{
        const token = localStorage.getItem("token")
        if(!token || !id){
          throw new Error("something wrong")
        }
        const init = {
          method:"GET",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const data = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-task/${id}`,init).then(res => res.json()).then((data:Task) => data)
        return data
    }
    const getTeacherTask = async (auth:Auth):Promise<Array<Task>> =>{
        const token = localStorage.getItem("token")
        if(!token || !auth._id){
          throw new Error("something wrong")
        }
        const init = {
          method:"GET",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const data = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-teacher-tasks/${auth._id}`,init).then(res => res.json()).then((data:Array<Task>) => data)
        return data
    }
    //* POST functions
 
    /**
     * @param {TaskSent} props {tsk:string,id:string,auth:string}
     */
    const sendTask = async ({...props}:TaskSent):Promise<boolean> =>{
            const token = localStorage.getItem("token")
          if(!token || !props.tsk || !props?.id || !props.auth){
            throw new Error("something wrong")
          }
          try {
              const studentTask = {
                student:props.auth?._id,
                file:props.tsk
              }
              const init = {
                method:"POST",
                headers: {
                  'Content-Type':"application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({id:props.id,studentTask})
              }
              fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/sendTask`,init).then(res=> res.json()).then(data => console.log(data))
              return true
            } catch (error) {
              throw new Error("something wrong")
          }
        
    }
    const createTask = async (taskData:Object)=>{
        const token = localStorage.getItem("token")
        console.log(taskData)
        if(!token){
        console.log("!something wrong")
        throw new Error("something wrong")
        }
        try {
            const init:Object = {
              method:"POST",
              headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
              },
              mode: 'cors',
              body:JSON.stringify(taskData)
            }
            const data:any = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/create`,init).then((res) => res.json()).then((data) => data)
            return data
          } catch (error) {
            throw new Error("something wrong")
          }

    }
    return(
        <TasksContext.Provider 
            value={{
                sendTask,
                getTask,
                getTeacherTask,
                createTask
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}

export {
    TasksContext
}


export default TasksProvider
