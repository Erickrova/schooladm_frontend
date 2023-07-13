import { createContext } from "react";
import { Auth } from "../helpers/interfaces";

const TasksContext = createContext<any|null>(null)

const TasksProvider = ({children}:any) =>{

    // GET
    const getTask = async (id:String) =>{
        const token = localStorage.getItem("token")
        if(!token){
          console.log("something wrong")
          return
        }
        if(!id){
          console.log("something wrong")
          return
        }
        const init = {
          method:"GET",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const data = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-task/${id}`,init).then(res => res.json()).then(data => data)
        return data
    }
    const getTeacherTask = async (auth:Auth) =>{
        const token = localStorage.getItem("token")
      if(!token){
        console.log("something wrong")
        return
      }
      if(!auth._id){
        console.log("something wrong")
        return
      }
        const init = {
          method:"GET",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const data = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-teacher-tasks/${auth._id}`,init).then(res => res.json()).then(data => data)
        return data
    }
    // POST
    const sendTask = async ({...props}) =>{
      console.log(props)
        if(props.tsk){
            const token = localStorage.getItem("token")
          if(!token){
            console.error("something wrong")
            return false
          }
          if(token && props.id){
            const studentTask = {
              student:props.auth?._id,
              file:props.tsk
            }
            try {
              const init = {
                method:"POST",
                headers: {
                  'Content-Type':"application/json",
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({id:props.id,studentTask})
              }
              return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/sendTask`,init).then(res=> res.json()).then(data => console.log(data))
            } catch (error) {
              console.log(error)
              return false
            }
          }
        }
    }
    const createTask = async (taskData:Object)=>{
        const token = localStorage.getItem("token")
        console.log(taskData)
        if(!token){
        console.log("!something wrong")
        return
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
            console.error(error)
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
