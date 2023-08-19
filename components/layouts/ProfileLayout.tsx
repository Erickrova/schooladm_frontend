import React, { useEffect } from "react"
import Layout from "./Layout"
import Link from "next/link"
import useAuth from "../../hooks/useAuth"
import BackRoute from "./BackRoute"
import { ChildrenProps } from "../../helpers/interfaces"

const ProfileLayout = ({ children }: ChildrenProps): JSX.Element | null => {
  const { profile, auth, loading } = useAuth()
  const { personalData } = profile
  return auth?._id && !loading ? (
    <Layout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[100px]">
          {personalData ? (
            <>
              <div className="flex justify-center items-center gap-4 px-4 md:px-0">
                <div className="w-32 h-32 aspect-square rounded-full bg-white border-red-400 border-2 "></div>
                <div>
                  <h2 className="text-xl font-bold text-white">{`${personalData?.firstName} ${personalData?.lastName}`}</h2>
                  {auth?.rank == 1 ? (
                    <p className="text-gray-200">{`${personalData?.career?.name}`}</p>
                  ) : auth?.rank == 2 ? (
                    <p className="text-gray-200">{`Teacher`}</p>
                  ) : auth?.rank == 3 ? (
                    <p className="text-gray-200">{`Admin`}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <nav className="flex gap-4 justify-evenly p-2 border-y-2 mt-4">
                  <Link
                    href={"/profile"}
                    className="text-white hover:text-red-100 transition-colors"
                  >
                    Personal Data
                  </Link>
                  {auth.rank == 1 ? (
                    <Link
                      href={"/profile/about-career"}
                      className="text-white hover:text-red-100 transition-colors"
                    >
                      About Career
                    </Link>
                  ) : null}
                  {auth.rank == 1 ? (
                    <Link
                      href={"/profile/qualifications"}
                      className="text-white hover:text-red-100 transition-colors"
                    >
                      qualifications
                    </Link>
                  ) : null}
                </nav>
              </div>
              {children}
            </>
          ) : (
            <></>
          )}
        </section>
      </div>
    </Layout>
  ) : !loading ? (
    <BackRoute />
  ) : null
}

export default ProfileLayout
