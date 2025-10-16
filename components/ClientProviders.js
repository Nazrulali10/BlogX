'use client'

import { SessionProvider } from 'next-auth/react'
import AppContextProvider from '@/context/AppContext'
import { ToastContainer } from 'react-toastify'

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <AppContextProvider>
        <ToastContainer className='dark:bg-gray-900' />
        {children}
      </AppContextProvider>
    </SessionProvider>
  )
}
