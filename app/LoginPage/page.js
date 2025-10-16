

'use client'
import { Mail, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (session) {
      router.push('/') // Redirect to home if already logged in
    }
  }, [session])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error('Fill all fields')
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result.ok) {
      toast.success('Logged in successfully')
      router.push('/') // Redirect to home
    } else {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="w-full flex justify-center items-center min-h-150">
      <form
        onSubmit={handleSubmit}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white dark:bg-gray-900"
      >
        <h1 className="text-gray-900 dark:text-white text-3xl mt-10 font-medium">Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please Login to continue</p>

        <div className="flex items-center w-full mt-10 bg-white dark:bg-gray-900 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={18} className="text-gray-400 text-xs" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email id"
            className="bg-transparent text-gray-500 dark:text-white placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white dark:bg-gray-900 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={18} className="text-gray-400 text-xs" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-transparent text-gray-500 dark:text-white placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="mt-5 text-left text-blue-700 dark:text-blue-600">
          <p className="text-xs">Welcome to BlogX</p>
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-blue-700 hover:bg-blue-800 transition-opacity"
        >
          Login
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don’t have an account? <Link className="text-blue-700 dark:text-blue-600" href="/SignupPage">Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
