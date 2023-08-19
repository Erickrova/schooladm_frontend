import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import { Careers, Semester } from "../../../helpers/interfaces"
import { User } from "../../../helpers/interfaces"
import useEvent from "../../../hooks/useEvent"
import useCareer from "../../../hooks/useCareer"
import useUser from "../../../hooks/useUser"

const CreateEvent = () => {
  const { careers } = useCareer()
  const { teachers } = useUser()

  const [eventCreator, setEventCreator] = useState<string>()
  const [title, setTitle] = useState<String>("")
  const [description, setDescription] = useState<String>("")
  const [initialDate, setInitialDate] = useState<String>("")
  const [finalDate, setFinalDate] = useState<String>("")
  const [guestsListShow, setGuestsListShow] = useState<Array<Object>>([])
  const { createEvent } = useEvent()
  const handleCreateEvent = async (e: any): Promise<void> => {
    e.preventDefault()
    if (!title || !description || !initialDate || !finalDate) {
      console.error("something is wrong")
      return
    }
    let guests: Array<string> = []
    // adding the students id to guestsList
    guestsListShow.forEach((semester: any) => {
      semester.semester.students.forEach((student: string) => {
        if (!guests.includes(student)) {
          guests.push(student)
        }
      })
    })
    const eventData: Object = {
      guestsList: guests,
      eventCreator,
      title,
      description,
      initialDate,
      finalDate,
    }
    const data: any = await createEvent(eventData)
    if (data?.state) {
      setEventCreator("")
      setTitle("")
      setDescription("")
      setInitialDate("")
      setFinalDate("")
      setGuestsListShow([])
    }
    alert(data?.msg)
  }
  const handleAddGuestToList = (guest: string) => {
    if (
      !guestsListShow.some((semester: any) => semester.semester._id == guest)
    ) {
      const career: Careers = careers.find((career: Careers) =>
        career.semesters.some((semester: Semester) => semester._id == guest),
      ) ?? { _id: "" }
      const semester = career?.semesters.find(
        (semester) => semester._id == guest,
      )
      setGuestsListShow([...guestsListShow, { career, semester }])
    }
  }
  const handleAddAll = (guest: string) => {
    const career: Careers | undefined = careers.find(
      (career: Careers) => career._id == guest,
    )
    const listShow = career?.semesters
    listShow?.forEach((element) => {
      if (
        !guestsListShow.some(
          (semest: any) => semest.semester._id == element._id,
        )
      ) {
        setGuestsListShow((prev) => [...prev, { career, semester: element }])
      }
    })
  }
  const handleRemoveGuestOfList = (guest: string) => {
    const newGuestListShow = guestsListShow.filter(
      (gues: any) => gues.semester._id != guest,
    )
    setGuestsListShow(newGuestListShow)
  }
  const revomeAllGuests = () => {
    setGuestsListShow([])
  }

  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form
            onSubmit={handleCreateEvent}
            className=" mx-4 md:mx-auto md:w-1/2"
          >
            <legend className="text-center text-4xl text-white font-black mb-10">
              Create an event
            </legend>
            <select value={""} className="p-2 rounded-full w-full mb-2">
              <option value={""} disabled>
                Select a guests{" "}
              </option>
              {careers?.length
                ? careers.map((career: Careers) => (
                    <>
                      <option
                        key={String(career?._id)}
                        value={String(career?._id)}
                        onClick={() => handleAddAll(String(career._id))}
                      >
                        {career?.name} all
                      </option>
                      {career?.semesters?.map((semester) => (
                        <option
                          key={String(semester?._id)}
                          value={String(semester?._id)}
                          onClick={() => handleAddGuestToList(semester._id)}
                        >
                          {career?.name} semester {semester?.semester}{" "}
                        </option>
                      ))}
                    </>
                  ))
                : null}
            </select>
            <select
              value={String(eventCreator)}
              onChange={(e) => setEventCreator(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={""}>Select event creator </option>
              {teachers.map((tch: User) => (
                <option key={String(tch?._id)} value={String(tch?._id)}>
                  {tch?.personalData?.firstName} {tch?.personalData?.lastName}
                </option>
              ))}
            </select>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">Title</label>
              <input
                type="text"
                value={String(title)}
                onChange={(e) => setTitle(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student name"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Description
              </label>
              <textarea
                name=""
                value={String(description)}
                onChange={(e) => setDescription(String(e.target.value))}
                id=""
                className="w-full h-32 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">files</label>
              <input type="file" />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                initial date
              </label>
              <input
                type="date"
                value={String(initialDate)}
                onChange={(e) => setInitialDate(String(e.target.value))}
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">final date</label>
              <input
                type="date"
                value={String(finalDate)}
                onChange={(e) => setFinalDate(String(e.target.value))}
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Guests to add:
              </label>
              <ul>
                {guestsListShow.map((guest: any) => (
                  <li
                    key={guest._id}
                    className="p-1 rounded-md bg-gray-400 bg-opacity-50 flex items-center justify-between my-1 gap-2"
                  >
                    <p className="text-white capitalize">
                      {guest?.career?.name} semester {guest.semester.semester}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        guest?.semester?._id &&
                        handleRemoveGuestOfList(guest.semester._id)
                      }
                      className="p-2 w-10 h-10 m-0 text-white font-bold flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 hover:uppercase transition-colors"
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {guestsListShow.length ? (
              <button
                type="button"
                onClick={revomeAllGuests}
                className="p-2 m-0 text-white font-bold flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 uppercase transition-colors"
              >
                delete all
              </button>
            ) : null}
            <input
              type="submit"
              value="Create Event"
              className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4"
            />
          </form>
        </section>
      </div>
    </AdminLayout>
  )
}

export default CreateEvent
