import type { RouteObject } from './types'
import { Navigate, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { genFullPath } from './helpers'
import { ExceptionEnum } from '@/enums/exceptionEnum'
import { getAuthCache } from '@/utils/auth'
import { TOKEN_KEY } from '@/enums/cacheEnum'
import LoginPage from '@/views/login'
import PageException from '@/views/exception'
import { Loading } from '@/components/Loading'

const metaRoutes = import.meta.glob('./routes/*.tsx', { eager: true }) as Recordable

const routeList: RouteObject[] = []

Object.keys(metaRoutes).forEach(key => {
  const module = metaRoutes[key].default || {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  genFullPath(moduleList)
  routeList.push(...moduleList)
})

const rootRoutes: RouteObject[] = [
  {
    path: '/',
    name: 'Root',
    element: <Navigate to='/applications' />
  },
  {
    path: '/login',
    name: 'Login',
    element: <LoginPage />,
    meta: {
      title: 'Login',
      key: 'login'
    },
    loader: () => {
      if (getAuthCache<string>(TOKEN_KEY)) {
        return redirect('/')
      }
      return null
    }
  },
  ...routeList,
  {
    path: '*',
    name: 'RedirectTo',
    element: <Navigate to='/404' />
  },
  {
    path: '/403',
    name: 'PageNotAuth',
    element: <PageException />,
    loader: () => ({ status: ExceptionEnum.PAGE_NOT_ACCESS, withCard: false })
  },
  {
    path: '/404',
    name: 'PageNotFound',
    element: <PageException />,
    loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: false })
  }
]

export { routeList as basicRoutes }

export default function RenderRoutes() {
  return <RouterProvider fallbackElement={<Loading />} router={createBrowserRouter(rootRoutes)}></RouterProvider>
}
