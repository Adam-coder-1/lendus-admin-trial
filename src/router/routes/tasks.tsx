import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { BarsOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom'

// component module page
const CompoRoute: RouteObject = {
  path: '/tasks',
  name: 'Tasks',
  element: <LayoutGuard />,
  meta: {
    title: 'Tasks',
    icon: <BarsOutlined />,
    orderNo: 1,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      element: <Navigate to='/403' />,
      meta: {
        title: 'Tasks',
        key: 'Tasks'
      }
    }
  ]
}

export default CompoRoute
