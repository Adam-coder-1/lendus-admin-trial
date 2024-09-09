import { memo, useEffect } from 'react'
import { Col, Row, Spin } from 'antd'
import type { SpinProps } from 'antd/es/spin'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})

interface LoadingProps extends SpinProps {
  height?: string | number
}

const Loading: React.FC<LoadingProps> = memo(({ height = '100vh', ...restProps }) => {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <Row align='middle' justify='center' style={{ height }}>
      <Col className='w-full'>
        <Spin size='large' {...restProps}>
          {/* antd 5.5 After that Spin must have children in order to use tip. Placeholder only */}
          <></>
        </Spin>
      </Col>
    </Row>
  )
})

export default Loading
