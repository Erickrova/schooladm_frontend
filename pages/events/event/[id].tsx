import React, { useEffect, useState } from "react"
import Layout from "../../../components/layouts/Layout"
import { useRouter } from "next/router"
import useAuth from "../../../hooks/useAuth"
import BackRoute from "../../../components/layouts/BackRoute"
import { Event, User } from "../../../helpers/interfaces"
import useEvent from "../../../hooks/useEvent"

const EventTarget = () => {
  const [event, setEvent] = useState<Event>()
  const [initialDate, setInitialDate] = useState<string>("")
  const [finalDate, setFinalDate] = useState<string>("")
  const [isConfirm, setIsConfirm] = useState<boolean>(true)
  const [pendingToConfirm, setPendingToConfirm] = useState<Array<User>>([])
  const { deleteEvent, confirmGuest, getEvent } = useEvent()
  const { auth, loading } = useAuth()
  const router = useRouter()
  const { id } = router.query

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      if (id.length) {
        const data = await deleteEvent(id)
        if (data.msg) {
          alert(data.msg)
        }
      }
    }
  }
  const handleConfirmGuest = async (id: string, uid: string) => {
    const data = await confirmGuest(id, uid)
    if (data?.status == true) {
      setIsConfirm(true)
    } else {
      setIsConfirm(false)
    }
  }
  useEffect(() => {
    const call = async () => {
      if (id) {
        const data = await getEvent(id)
        setEvent(data)
      }
    }
    call()
  }, [id, getEvent])
  useEffect(() => {
    if (event) {
      // formating Dates
      const initialdate = event?.initialDate ?? ""
      const realinitialdate = initialdate.split("T")[0]
      const finaldate = event?.finalDate ?? ""
      const realfinaldate = finaldate.split("T")[0]
      setInitialDate(realinitialdate)
      setFinalDate(realfinaldate)
    }
    // setting if userConfirm its presence
    if (event?._id && event?.confirmGuests) {
      const confirmed = event?.confirmGuests.some((guest) => guest == auth?._id)
      if (confirmed) {
        setIsConfirm(true)
      } else {
        setIsConfirm(false)
      }
    } else {
      setIsConfirm(false)
    }
    if (event?.guests && event?.confirmGuests) {
      const pendingPresences = event.guests.filter(
        (user: User) =>
          !event.confirmGuests.some((usr: User) => user._id == usr._id),
      )
      setPendingToConfirm(pendingPresences)
    }
  }, [event, auth])

  return auth?._id && !loading ? (
    <Layout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full overflow-hidden pt-[100px]">
          <div className="flex justify-center items-center gap-4 px-4 md:px-0">
            <h2 className="text-3xl font-bold text-white">{event?.title}</h2>
            {auth?.rank > 2 ? (
              <button
                onClick={() => handleDeleteEvent(String(id))}
                className=" bg-red-500 hover:bg-red-700 rounded-lg px-2 py-1 text-xl text-white transition-colors text-center font-bold uppercase"
              >
                delete
              </button>
            ) : null}
          </div>
          <div className=" md:w-2/3 px-10 pt-10 flex flex-col md:flex-row gap-4">
            <p className="text-sm font-bold text-white">From: {initialDate}</p>
            <p className="text-sm font-bold text-white">To: {finalDate}</p>
          </div>
          <div className="flex flex-col md:flex-row ">
            <div className="md:w-2/3 mb-10 md:mb-0 flex flex-col justify-center items-center md:max-h-[500px] px-10 overflow-y-auto">
              <div className="h-[300px] overflow-y-auto p-2 rounded-t-md bg-slate-400 bg-opacity-20 w-full">
                <p className=" text-white text-center text-xl font-bold">
                  event description
                </p>
                <p className=" text-white">{event?.description}</p>
              </div>
              <div className="md:w-full max-h-[200px] overflow-y-auto flex flex-wrap gap-2 p-2 bg-slate-400 bg-opacity-20 border-t-2 rounded-b-md">
                <div className="w-[150px] h-[150px] bg-sky-400"></div>
                <div className="w-[150px] h-[150px] bg-blue-400"></div>
                <div className="w-[150px] h-[150px] bg-sky-400"></div>
                <div className="w-[150px] h-[150px] bg-blue-400"></div>
                <div className="w-[150px] h-[150px] bg-sky-400"></div>
                <div className="w-[150px] h-[150px] bg-blue-400"></div>
                <div className="w-[150px] h-[150px] bg-sky-400"></div>
                <div className="w-[150px] h-[150px] bg-blue-400"></div>
                <div className="w-[150px] h-[150px] bg-sky-400"></div>
                <div className="w-[150px] h-[150px] bg-blue-400"></div>
                <p className="text-2xl text-white">event files</p>
              </div>
            </div>
            <div className="md:w-1/3 px-5 flex flex-col justify-center items-center">
              <p className="text-2xl font-bold text-white">
                {isConfirm
                  ? "your presence was confirmed"
                  : "confirm your presence"}
              </p>
              <button
                onClick={() => handleConfirmGuest(String(id), auth?._id)}
                className={`w-full px-2 py-1 ${
                  isConfirm
                    ? "bg-green-400 hover:bg-red-500"
                    : "bg-red-400 hover:bg-green-500"
                }   text-white font-bold rounded-md cursor-pointer  transition-colors my-5 capitalize`}
              >
                {isConfirm ? "disconfirm" : "confirm"}
              </button>
              {auth.rank > 1 ? (
                <div className="w-full px-2 py-1">
                  <h2 className="text-2xl font-bold text-white">
                    Confirmed Presences
                  </h2>
                  <div className="w-full px-2 py-1 max-h-52 overflow-y-auto">
                    {event?.confirmGuests
                      ? event?.confirmGuests?.map((user: User) => (
                          <p
                            key={user._id}
                            className="p-2 rounded-md bg-gray-100 mb-1"
                          >
                            {user.personalData?.firstName}{" "}
                            {user.personalData?.lastName}
                          </p>
                        ))
                      : null}
                  </div>
                  <p className="text-2xl font-bold text-white">
                    Pending To Confirm Presence
                  </p>
                  <div className="w-full px-2 py-1 max-h-52 overflow-y-auto">
                    {pendingToConfirm?.length
                      ? pendingToConfirm.map((user: User) => (
                          <p
                            key={user._id}
                            className="p-2 rounded-md bg-gray-100 mb-1"
                          >
                            {user.personalData?.firstName}{" "}
                            {user.personalData?.lastName}
                          </p>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  ) : !loading ? (
    <BackRoute />
  ) : null
}

export default EventTarget
