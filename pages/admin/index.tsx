import React from "react"
import Layout from "../../components/layouts/Layout"
import Link from "next/link"
import AdminLayout from "../../components/layouts/AdminLayout"

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="h-full w-full flex justify-center items-center -mt-10">
        <h1 className="text-4xl font-black text-white">
          Welcome to admin dashboard
        </h1>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
