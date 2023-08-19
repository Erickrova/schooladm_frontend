import React, { useEffect, useState } from "react"
import Layout from "../../components/layouts/Layout"
import { Event } from "../../helpers/interfaces"
import useAuth from "../../hooks/useAuth"
import LargeCardEvent from "../../components/cards/LargeCardEvent"
import BackRoute from "../../components/layouts/BackRoute"
import formatDate from "../../helpers/formatDate"
import { comparerDates } from "../../helpers/comparerDates"
import useEvent from "../../hooks/useEvent"

const EventsIndex = () => {
  const [events, setEvents] = useState<Array<Event>>([])
  const [eventsShow, setEventsShow] = useState<Array<Event>>([])
  const { auth, loading } = useAuth()
  const { getStudentEvents } = useEvent()

  useEffect(() => {
    const call = async () => {
      if (auth._id) {
        const data = await getStudentEvents(auth._id)
        setEvents(data)
      }
    }
    call()
  }, [auth, getStudentEvents])
  useEffect(() => {
    if (events) {
      // filtering the events whose finalDate has already passed
      const activeEvents = events.filter((event) => {
        if (event.finalDate) {
          const eventDate = formatDate(event.finalDate)
            .split("/")
            .reverse()
            .join("-")
          const currentDate = formatDate(String(Date.now()))
            .split("/")
            .reverse()
            .join("-")
          const result = comparerDates(currentDate, eventDate)
          if (result == 1 || result == 0) return event
        }
      })
      setEventsShow(activeEvents)
    }
  }, [events])
  return auth?._id && !loading ? (
    <Layout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[100px]">
          <div>
            <h1 className="text-center text-4xl text-white font-black my-5">
              Events
            </h1>
            <div>
              {eventsShow?.length ? (
                <ul className="md:w-2/3 mx-auto">
                  {eventsShow.map((event) => (
                    <LargeCardEvent key={event?._id} data={event} />
                  ))}
                </ul>
              ) : (
                <p className="pt-[50px] text-center text-4xl text-white font-black mb-10">
                  no items
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  ) : !loading ? (
    <BackRoute />
  ) : null
}

export default EventsIndex
