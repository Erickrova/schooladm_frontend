import React from 'react'
import Layout from '../../components/layouts/Layout'
import Link from 'next/link'
import AdminLayout from '../../components/layouts/AdminLayout'

const index = () => {
  return (
   <AdminLayout>
    <h1>Welcome to admin dashboard</h1>
   </AdminLayout>
  )
}

export default index