import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'
import { FileOutlined } from '@ant-design/icons'

// component module page
const CompoRoute: RouteObject = {
  path: '/applications',
  name: 'All Applications',
  element: <LayoutGuard />,
  meta: {
    title: 'Applications',
    icon: <FileOutlined />,
    orderNo: 3,
    key: 'All Applications'
  },
  children: [
    {
      path: '',
      name: 'All Applications',
      element: LazyLoad(lazy(() => import('@/views/applications/index'))),
      meta: {
        title: 'Applications',
        key: 'Applications',
        hideMenu: true
      }
    },
    {
      path: 'detail',
      name: 'Applications Detail',
      element: LazyLoad(lazy(() => import('@/views/applications/detail'))),
      meta: {
        title: 'Applications Detail',
        key: 'ApplicationsDetail',
        hideMenu: true
      }
    }
  ]
}

export default CompoRoute
