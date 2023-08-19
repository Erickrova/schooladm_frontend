import { createContext, useEffect, useState } from "react"
import { ChildrenProps, Event } from "../helpers/interfaces"
import useAuth from "../hooks/useAuth"

const EventContext = createContext<null | any>(null)

const EventProvider = ({ children }: ChildrenProps) => {
  const [events, setEvents] = useState<Array<Event>>([])
  const { auth } = useAuth()

  //** GET functions
  const getEvents = async (): Promise<Array<Event>> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("something wrong")
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        "http://localhost:4000/api/event/get-events",
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  const getEvent = async (id: string): Promise<Event> => {
    const token = localStorage.getItem("token")
    if (!token || !id) throw new Error("something wrong")
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        `http://localhost:4000/api/event/get-event/${id}`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  const getStudentEvents = async (userId: string): Promise<Array<Event>> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("something wrong")
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        `http://localhost:4000/api/event/get-student-events/${userId}`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  //** POST functions
  const createEvent = async (eventData: Object): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("something wrong")
    }
    try {
      const init: Object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify(eventData),
      }
      const data: any = await fetch(
        "http://localhost:4000/api/event/create",
        init,
      )
        .then((res) => res.json())
        .then((data: any) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  //** PUT funtions
  const confirmGuest = async (
    eventId: string,
    userId: string,
  ): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token || !eventId || !userId) throw new Error("something wrong")
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/confirm/guest/${eventId}/${userId}`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  //** Delete functions
  const deteleEvent = async (id: string): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token || !id) throw new Error("something wrong")
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/delete/${id}`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }

  useEffect(() => {
    const call = async () => {
      let data = await getEvents()
      setEvents(data)
    }
    if (auth._id) {
      call()
    }
  }, [auth])
  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        deteleEvent,
        confirmGuest,
        getStudentEvents,
        getEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
export { EventContext }
export default EventProvider
