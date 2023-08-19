import Layout from "./Layout"
import useAuth from "../../hooks/useAuth"
import BackRoute from "./BackRoute"
import { ChildrenProps } from "../../helpers/interfaces"
import AdminLateralNavBar from "../navs/AdminLateralNavBar"

const AdminLayout = ({ children }: ChildrenProps) => {
  const { profile, auth, loading } = useAuth()
  const { personalData } = profile
  return auth?._id && !loading ? (
    <Layout>
      <section className="w-full flex flex-col md:flex-row h-screen overflow-hidden relative">
        <AdminLateralNavBar personalData={personalData} />
        <div className="md:w-5/6 h-screen overflow-y-auto bg-sky-600 pt-16 md:pt-0">
          {children}
        </div>
      </section>
    </Layout>
  ) : !loading ? (
    <BackRoute />
  ) : null
}

export default AdminLayout
