import type { MenuProps } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Spin } from 'antd'
import type { AppMenu } from '@/router/types'
import { getOpenKeys } from '@/utils/helper/menuHelper'
import SvgIcon from '@/components/SvgIcon'
import { MailOutlined, SettingOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/stores'
import { getAuthCache, clearAuthCache } from '@/utils/auth'
import { TOKEN_KEY } from '@/enums/cacheEnum'
import { useMessage } from '@/hooks/web/useMessage'
import { logoutApi } from '@/api'
import { resetState } from '@/stores/modules/user'

type MenuItem = Required<MenuProps>['items'][number]

const LayoutBottomMenu = (props: any) => {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.user)
  const getToken = (): string => {
    return token || getAuthCache<string>(TOKEN_KEY)
  }
  useEffect(() => {
    setSelectedKeys([pathname])

    setOpenKeys(getOpenKeys(pathname))
  }, [pathname])

  const getMenuList = async () => {
    setLoading(true)
    try {
      const menuList = [
        {
          key: '/settings',
          label: 'Settings',
          icon: <SettingOutlined />
        },
        {
          key: 'logout',
          label: 'Logout',
          icon: <MailOutlined />
        }
      ]
      setMenuList(menuList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMenuList()
  }, [])

  const handleOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    if (keys.length === 0 || keys.length === 1) return setOpenKeys(keys)
    const latestKey = keys[keys.length - 1]
    if (latestKey.includes(keys[0])) return setOpenKeys(keys)
    setOpenKeys([latestKey])
  }

  const navigate = useNavigate()
  const handleMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
    switch (key) {
      case '/setting':
        navigate(key)
        break
      case 'logout':
        handleLogout()
        break
    }
  }
  const handleLogout = () => {
    const { createConfirm } = useMessage()

    createConfirm({
      iconType: 'warning',
      title: <span>Friendly Reminder</span>,
      content: <span>Do you want to log out of the system?</span>,
      onOk: async () => {
        await logoutAction(true)
      }
    })
  }

  const logoutAction = async (goLogin = false) => {
    if (getToken()) {
      try {
        await logoutApi()
      } catch (error) {
        const { createMessage } = useMessage()
        createMessage.error('Failure to logout!')
      }
    }
    dispatch(resetState())
    clearAuthCache()
    goLogin && navigate('/login')
  }

  return (
    <div className='layout-menu'>
      <Spin spinning={loading} tip='Loading...'>
        <Menu
          theme='dark'
          mode='inline'
          triggerSubMenuAction='click'
          inlineIndent={20}
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

export default LayoutBottomMenu
