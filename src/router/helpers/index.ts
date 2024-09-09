import type { RouteObject, AppMenu } from '../types'
import { cloneDeep } from 'lodash-es'
import { isUrl } from '@/utils/is'
import { treeMap } from '@/utils/helper/treeHelper'

/**
 * Joins the parent path to the menu items in the given array of menus.
 * This function modifies the 'path' property of each menu item by appending the parent path if the menu item's path doesn't start with a slash or is not a URL.
 *
 * @param menus An array of AppMenu objects.
 * @param parentPath The parent path to be joined (default is an empty string).
 */
export function joinParentPath(menus: AppMenu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // Note that nested paths that start with / will be treated as a root path.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // Path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

/**
 * Filters the tree data by removing children of nodes where 'hideChildrenInMenu' is set to true.
 * This function recursively traverses the tree structure.
 *
 * @param list An array of RouteObject objects representing a tree structure.
 */
function filterTreeData(list: RouteObject[]) {
  return list.forEach(item => {
    item.children?.length && filterTreeData(item.children)
    if (item.meta!.hideChildrenInMenu) {
      item.children = []
    }
  })
}

/**
 * Transforms an array of RouteObject into an array of AppMenu.
 * This function clones the routes, filters the tree data, and then maps the tree structure to an array of AppMenu.
 *
 * @param routes An array of RouteObject.
 * @returns An array of AppMenu objects.
 */
export function transformRouteToMenu(routes: RouteObject[]) {
  const routeList = cloneDeep(routes)
  filterTreeData(routeList)

  const list = treeMap(routeList, {
    conversion: (node: RouteObject) => {
      const { meta: { title, hideMenu = false, ...rest } = {} } = node

      return {
        ...(rest || {}),
        name: title,
        hideMenu,
        path: node.path
      }
    }
  }) as AppMenu[]

  joinParentPath(list)
  return cloneDeep(list)
}

/**
 * Generates the full path for each route in the given array of routes.
 * If a route's path starts with a slash, it is set as the full path. Otherwise, the parent path is prepended to the route's path.
 *
 * @param routes An array of RouteObject.
 * @param parentPath The parent path (default is an empty string).
 */
export function genFullPath(routes: RouteObject[], parentPath = '') {
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index]

    if (route.path!.startsWith('/')) {
      route.fullPath = route.path
    } else {
      route.fullPath = `${parentPath}/${route.path}`
    }

    if (route?.children?.length) {
      genFullPath(route.children, route.fullPath)
    }
  }
}
