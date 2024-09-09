import { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation, matchRoutes } from 'react-router-dom'
import { useAppSelector } from '@/stores'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { matchSelectedMainMenu } from '@/utils/helper/menuHelper'

export default function LayoutBreadcrumb() {
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([])
  const { pathname } = useLocation()
  const getMenuList = useAppSelector(state => state.menu.menuList)

  useEffect(() => {
    // Matching logic between menu and route
    if (pathname === matchSelectedMainMenu(pathname)) {
      setBreadcrumbs([])
      return
    }
    const matchRouteList = matchRoutes(getMenuList, matchSelectedMainMenu(pathname)) || []
    const breadcrumbList = matchRouteList.map((item: any) => {
      const { key, icon = '' } = item?.route
      const href = matchSelectedMainMenu(pathname) || '/applications'
      return {
        href,
        title: (
          <>
            {icon && <ArrowLeftOutlined />}
            <span>{key}</span>
          </>
        )
      }
    })
    setBreadcrumbs(breadcrumbList)
  }, [pathname])

  return (
    <div className='flex-center-v' style={{ padding: '16px 8px' }}>
      <Breadcrumb items={breadcrumbs} />
    </div>
  )
}
