import type { MenuProps } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, useRoutes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Menu, Spin } from 'antd'
import { getAsyncMenus } from '@/router/menus'
import type { AppMenu } from '@/router/types'
import { setMenuList as setMenuListAction } from '@/stores/modules/menu'
import { getOpenKeys, matchSelectedMainMenu } from '@/utils/helper/menuHelper'
import SvgIcon from '@/components/SvgIcon'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    label,
    key,
    icon,
    children,
    type
  } as MenuItem
}

const LayoutMenu = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

  useEffect(() => {
    setSelectedKeys([matchSelectedMainMenu(pathname)])

    setOpenKeys(getOpenKeys(pathname))
  }, [pathname])

  const addIcon = (icon?: string | React.ReactNode) => {
    if (!icon) return null
    if (typeof icon === 'string') {
      return (
        <span className='anticon'>
          <SvgIcon name={icon} size={16} />
        </span>
      )
    } else {
      return icon
    }
  }

  /**
   * This function is used to generate an array of menu items.
   * It recursively traverses the input data structure to create a hierarchical menu item list.
   *
   * @param data An array of AppMenu objects representing the menu structure.
   * @param list An optional parameter which is an array of MenuItem objects. Defaults to an empty array. This is used for accumulating the generated menu items.
   * @returns An array of MenuItem objects representing the complete menu structure.
   */
  const getMenuItem = (data: AppMenu[], list: MenuItem[] = []) => {
    data.forEach((item: AppMenu) => {
      if (!item?.children?.length) {
        return list.push(getItem(item.name, item.path, addIcon(item.icon)))
      }
      list.push(getItem(item.name, item.path, addIcon(item.icon), getMenuItem(item.children)))
    })
    return list
  }

  const getMenuList = async () => {
    setLoading(true)
    try {
      const menus = await getAsyncMenus()
      const menuList = getMenuItem(menus)
      setMenuList(menuList)
      dispatch(setMenuListAction(menus))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMenuList()
  }, [])

  /**
   * The function handleOpenChange is used to handle the open state changes of menu items.
   * It conforms to the onOpenChange type of MenuProps.
   *
   * @param keys An array of strings representing the keys of the opened menu items.
   * @returns void. This function updates the state of open menu keys.
   */
  const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    if (keys.length === 0 || keys.length === 1) return setOpenKeys(keys)
    const latestKey = keys[keys.length - 1]
    if (latestKey.includes(keys[0])) return setOpenKeys(keys)
    setOpenKeys([latestKey])
  }

  const navigate = useNavigate()
  const handleMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <div className='layout-menu'>
      <Spin spinning={loading} tip='Loading...'>
        <Menu
          theme='dark'
          mode='inline'
          triggerSubMenuAction='click'
          inlineIndent={24}
          subMenuOpenDelay={0.2}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          items={menuList}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        />
      </Spin>
    </div>
  )
}

export default LayoutMenu
