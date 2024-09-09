import { Flex, Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import LayoutMenu from './menu'
import LayoutHeader from './header'
import { AppLogo } from '@/components/AppLogo'
import './index.less'
import { useTitle } from '@/hooks/web/useTitle'
import { useAppSelector } from '@/stores'
import LayoutBottomMenu from './bottomMenu'

export const BasicLayout = () => {
  useTitle()
  const { Sider, Content } = Layout
  const { state } = useLocation()
  const { key = 'key' } = state || {}
  const getMenuFold = useAppSelector(st => st.app.appConfig?.menuSetting?.menuFold)

  return (
    <Layout className='layout-wrapper'>
      <Sider width={264} trigger={null} collapsed={getMenuFold} style={{ height: '100vh' }}>
        <Flex vertical justify='space-between' style={{ height: '100vh' }}>
          <div>
            <AppLogo />
            <LayoutMenu />
          </div>
          <LayoutBottomMenu />
        </Flex>
      </Sider>
      <Layout>
        <LayoutHeader />
        <Layout id='mainCont'>
          <Content>
            <Outlet key={key} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
