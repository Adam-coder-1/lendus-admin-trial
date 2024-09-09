import type { AppMenu } from '../types'
import { basicRoutes } from '..'
import { transformRouteToMenu } from '../helpers'

// Get async menus
export async function getAsyncMenus(): Promise<AppMenu[]> {
  const staticMenus = transformRouteToMenu(basicRoutes)
  staticMenus.sort((a, b) => {
    return (a?.orderNo || staticMenus.length) - (b?.orderNo || staticMenus.length)
  })

  return filterTreeData(staticMenus)
}

function filterTreeData(list: AppMenu[]) {
  return list.filter(item => {
    const children = item.children ? filterTreeData(item.children) : []
    item.children = children
    return !item.hideMenu
  })
}
