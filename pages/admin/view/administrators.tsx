import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import { User } from "../../../helpers/interfaces"
import LargeCardUser from "../../../components/cards/LargeCardUser"
import useUser from "../../../hooks/useUser"

const Administrators = () => {
  const { administrators } = useUser()
  return (
    <AdminLayout>
      <section className="h-full w-full bg-sky-600">
        <h1 className="pt-[50px] text-center text-4xl text-white font-black mb-10">
          Administrators
        </h1>
        <form className=" mx-4 md:mx-auto md:w-1/2 flex">
          <select className="p-2 rounded-full w-full mb-2">
            <option value="">career</option>
          </select>

          <select className="p-2 rounded-full w-full mb-2">
            <option value="">semester</option>
          </select>
        </form>
        <div>
          {administrators?.length ? (
            <ul className="md:w-2/3 mx-auto max-h-[500px] pr-4 overflow-y-scroll">
              {administrators.map((adm: User) => (
                <LargeCardUser key={adm?._id} data={adm} />
              ))}
            </ul>
          ) : (
            <p className="pt-[50px] text-center text-4xl text-white font-black mb-10">
              no items
            </p>
          )}
        </div>
      </section>
    </AdminLayout>
  )
}

export default Administrators
