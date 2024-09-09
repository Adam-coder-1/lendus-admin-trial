/**
 * @description Get expand subMenu
 * @param {String} path Current route path
 * @returns subMenu array
 */
export const getOpenKeys = (path: string) => {
  let pathStr: string = ''
  const openKeys: string[] = []
  path.split('/').forEach(key => {
    if (key) {
      pathStr += '/' + key
      openKeys.push(pathStr)
    }
  })
  return openKeys.slice(0, -1)
}

/**
 * @description Matches the current route with the menu highlight
 * @param {String} path Current route path
 * @returns menu highlighted path
 */
export const matchSelectedMainMenu = (path: string) => {
  const routePath = path.split('/')
  return routePath.length >= 2 ? `/${routePath[1]}` : '/'
}
