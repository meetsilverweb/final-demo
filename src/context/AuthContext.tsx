// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { toast } from 'react-hot-toast'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  // useEffect(() => {
  //   const initAuth = async (): Promise<void> => {
  //     const storedToken = window.localStorage.getItem('accessToken')!
  //     if (storedToken) {
  //       setLoading(false)
  //       router.replace('/dashboard').catch(() => {
  //         localStorage.removeItem('userData')
  //         localStorage.removeItem('accessToken')
  //         setUser(null)
  //         setLoading(false)
  //         if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
  //           router.replace('/login')
  //         }
  //       })
  //     } else {
  //       setLoading(false)
  //     }
  //   }

  //   initAuth()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = localStorage.getItem('accessToken')
      if (storedToken) {
        setLoading(false)
        if (router.pathname) {
          const user1: any = {
            role: 'admin'
          }
          setUser({ ...user1 })
          router.push(router.pathname)
        }
      } else if (router.pathname === '/forgot-password') {
        setLoading(false)
        router.replace(router.pathname)
      } else if (router.pathname === '/create-password') {
        setLoading(false)
      } else {
        setUser(null)
        router.replace('/login')
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = ({ email, password }: any) => {
    const payload = {
      Email: email,
      password: password
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_ADMIN_URL}/adminLogin`, payload, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      .then(async response => {
        console.log(response)
        if (response?.data?.status === 200) {
          setLoading(false)
          const returnUrl = router.query.returnUrl
          setUser({ ...response?.data?.data?.admin, role: 'admin' })
          const token = response?.data?.data?.token ? response?.data?.data?.token : undefined
          const userData = response?.data?.data?.admin ? response?.data?.data?.admin : undefined
          localStorage.setItem('userData', JSON.stringify(userData))
          localStorage.setItem('accessToken', token)
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL as string)
        } else if (response?.data?.status === 402) {
          toast.error('Invalid credentials')
        } else if (response?.data?.status === 401) {
          toast.error('Invalid credentials')
        } else {
          setLoading(false)
          toast.error('Somthing went wrong')
        }
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
