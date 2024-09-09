import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { UserOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom'

// component module page
const CompoRoute: RouteObject = {
  path: '/accounts',
  name: 'Accounts',
  element: <LayoutGuard />,
  meta: {
    title: 'Accounts',
    icon: <UserOutlined />,
    orderNo: 2,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      element: <Navigate to='/403' />,
      meta: {
        title: 'Accounts',
        key: 'Accounts'
      }
    }
  ]
}

export default CompoRoute
