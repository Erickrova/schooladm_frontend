import AuthProvider from "../context/authProvider"
import CareerProvider from "../context/careerProvicer"
import EventProvider from "../context/eventProvider"
import SemesterProvider from "../context/semesterProvider"
import SubjectProvider from "../context/subjectProvider"
import TasksProvider from "../context/tasksProvider"
import UserProvider from "../context/userProvider"
import "../styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserProvider>
        <EventProvider>
          <CareerProvider>
            <SubjectProvider>
              <SemesterProvider>
                <TasksProvider>
                  <Component {...pageProps} />
                </TasksProvider>
              </SemesterProvider>
            </SubjectProvider>
          </CareerProvider>
        </EventProvider>
      </UserProvider>
    </AuthProvider>
  )
}
