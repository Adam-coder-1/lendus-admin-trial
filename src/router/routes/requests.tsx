import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { MailOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom'

// component module page
const CompoRoute: RouteObject = {
  path: '/requests',
  name: 'Requests',
  element: <LayoutGuard />,
  meta: {
    title: 'Requests',
    icon: <MailOutlined />,
    orderNo: 5,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      element: <Navigate to='/403' />,
      meta: {
        title: 'Requests',
        key: 'Requests'
      }
    }
  ]
}

export default CompoRoute
