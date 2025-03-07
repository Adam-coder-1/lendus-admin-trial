import { Layout } from 'antd'
import { Breadcrumb } from './components'

const LayoutHeader = () => {
  const { Header } = Layout

  return (
    <Header
      className='flex-between-h'
      style={{
        flexDirection: 'column',
        height: 'auto',
        background: '#fff'
      }}
    >
      <div className='flex-between-h' style={{ padding: '0 12px' }}>
        <div className='flex-center-v'>
          <Breadcrumb />
        </div>
      </div>
    </Header>
  )
}

export default LayoutHeader
