import { Result } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import RenderRoutes from '@/router'
import { setupProdMockServer } from '../mock/_createProductionServer'

function App() {
  const isBuild = process.env.NODE_ENV === 'production'
  if (isBuild) {
    setupProdMockServer()
  }

  return (
    <ErrorBoundary
      fallbackRender={props => {
        return <Result status='error' title='Some unknown error has occurred' subTitle={props.error.message} />
      }}
    >
      <RenderRoutes />
    </ErrorBoundary>
  )
}

export default App
