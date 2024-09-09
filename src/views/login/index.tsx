import type { LoginParams, UserInfo } from '@/types'
import { type FC, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAppSelector, useAppDispatch } from '@/stores'
import { setToken, setUserInfo, setSessionTimeout } from '@/stores/modules/user'
import { getAuthCache } from '@/utils/auth'
import { TOKEN_KEY } from '@/enums/cacheEnum'
import { loginApi, getUserInfo } from '@/api'
import classNames from 'classnames'
import styles from './index.module.less'

const LoginPage: FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()

  const { token, sessionTimeout } = useAppSelector(state => state.user)
  const getToken = (): string => {
    return token || getAuthCache<string>(TOKEN_KEY)
  }

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleLogin = async (values: any) => {
    try {
      setLoading(true)
      const userInfo = await loginAction({
        username: values.username,
        password: values.password
      })
      if (userInfo) {
        message.success('login successfully!')
      }
    } catch (error) {
      message.error((error as unknown as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const loginAction = async (
    params: LoginParams & {
      goHome?: boolean
    }
  ): Promise<UserInfo | null> => {
    try {
      const { goHome = true, ...loginParams } = params
      const data = await loginApi(loginParams)

      // save Token
      dispatch(setToken(data?.token))
      return afterLoginAction(goHome)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const afterLoginAction = async (goHome?: boolean): Promise<UserInfo | null> => {
    if (!getToken()) return null

    const userInfo = await getUserInfoAction()

    if (sessionTimeout) {
      dispatch(setSessionTimeout(false))
    } else {
      const redirect = searchParams.get('redirect')
      if (redirect) {
        navigate(redirect)
      } else {
        goHome && navigate(userInfo?.homePath || '/applications')
      }
    }

    return userInfo
  }

  const getUserInfoAction = async (): Promise<UserInfo | null> => {
    if (!getToken()) return null

    const userInfo = await getUserInfo()

    dispatch(setUserInfo(userInfo))

    return userInfo
  }

  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['login-box']}>
        <div className={styles['login-box-title']}>
          <p>Account number entry</p>
        </div>
        <Form
          form={form}
          initialValues={{
            username: 'admin',
            password: '123456',
            remember: true
          }}
          className={styles['login-box-form']}
          onFinish={handleLogin}
        >
          <Form.Item name='username' rules={[{ required: true, message: 'Please enter account number' }]}>
            <Input
              placeholder='Please enter account number'
              prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} rev={undefined} />}
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input
              type='password'
              placeholder='Please enter your password'
              prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} rev={undefined} />}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' className={classNames('fl', styles['no-margin'])} valuePropName='checked'>
              <Checkbox>remember me</Checkbox>
            </Form.Item>
            <Form.Item className={classNames('fr', styles['no-margin'])}>
              <a href=''>forget the password?</a>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className={styles['login-btn']} loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
