import AuthProvider from '../context/authProvider'
import TasksProvider from '../context/tasksProvider'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TasksProvider>
        <Component {...pageProps} />
      </TasksProvider>
    </AuthProvider>

  )
}
