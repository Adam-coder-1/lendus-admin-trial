import type { FC } from 'react'
import { Space } from 'antd'
import { useAppSelector } from '@/stores'
import classNames from 'classnames'
import styles from './app-logo.module.less'
import logoImg from '@/assets/images/logo.svg'
import { Typography } from 'antd'
const { Title } = Typography

const AppLogo: FC = () => {
  const getMenuFold = useAppSelector(state => state.app.appConfig?.menuSetting?.menuFold)

  return (
    <div className={classNames('anticon', styles['app-logo'])}>
      <Space>
        <img className={styles['logo-img']} src={logoImg} alt='logo' />
        <Title level={5} className={styles['lend-us-name']}>
          Lend Us
        </Title>
      </Space>
    </div>
  )
}

export default AppLogo
