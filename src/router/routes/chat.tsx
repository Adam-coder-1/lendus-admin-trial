import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { MessageOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router-dom'

// component module page
const CompoRoute: RouteObject = {
  path: '/chat',
  name: 'Chat',
  element: <LayoutGuard />,
  meta: {
    title: 'Chat',
    icon: <MessageOutlined />,
    orderNo: 4,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      element: <Navigate to='/403' />,
      meta: {
        title: 'Chat',
        key: 'Chat'
      }
    }
  ]
}

export default CompoRoute
