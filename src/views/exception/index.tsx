import type { FC, ReactNode } from 'react'
import { Result, Card, Button } from 'antd'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { ExceptionEnum } from '@/enums/exceptionEnum'

const subTitleMap = new Map([
  [ExceptionEnum.PAGE_NOT_ACCESS, 'Sorry, you do not have permission to access this page.'],
  [ExceptionEnum.PAGE_NOT_FOUND, 'Sorry, the page you are looking for does not exist.'],
  [ExceptionEnum.SERVER_ERROR, 'Sorry, an error occurred on the server.']
])

const PageException: FC = () => {
  const navigate = useNavigate()

  const { status, withCard } = useLoaderData() as { status: any; withCard: boolean }

  const goHome = () => {
    navigate('/')
  }

  const WithCard = ({ children }: { children: ReactNode }) => {
    if (withCard) {
      return <Card bordered={false}>{children}</Card>
    } else {
      return (
        <div className='flex-center' style={{ height: '100vh' }}>
          {children}
        </div>
      )
    }
  }

  return (
    <WithCard>
      <Result
        status={status}
        title={status}
        subTitle={subTitleMap.get(status)}
        extra={
          <Button type='primary' onClick={goHome}>
            Go to Applications
          </Button>
        }
      />
    </WithCard>
  )
}

export default PageException
