import { type FC, useEffect, useState } from 'react'
import { Flex, Space, Button, Steps, Tabs, Typography } from 'antd'
const { Title } = Typography
import type { TabsProps } from 'antd'
import './index.less'
import { getApplicationDetail } from '@/api'
import { stepTitles } from './schema/stepTitles'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useSearchParams } from 'react-router-dom'
import { ApplicationPreparationContents } from './components/applicationPreparation'

dayjs.extend(customParseFormat)

// Display application header information and basic operation buttons
// TODO: The logic of button 'View user profile'
// TODO: The logic of button 'Reset Application'
// TODO: The logic of button 'Generate Advisor Report'
const Operate: FC<{ name: string; id: string }> = ({ name, id }) => {
  return (
    <Flex gap='middle' justify='space-between' className='operate-wrapper'>
      <Space size='middle'>
        <Title level={2} style={{ marginBottom: '0px' }}>
          {name} {id}
        </Title>
        <Button>View user profile</Button>
      </Space>
      <Space>
        <Button>Reset Application</Button>
        <Button type='primary'>Generate Advisor Report</Button>
      </Space>
    </Flex>
  )
}

const ApplicationDetail: FC = () => {
  const [step, setStep] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [horizontalTab, setHorizontalTab] = useState('Application Preparation')
  const StepItems = stepTitles.map(item => ({
    title: <span>{item}</span>
  }))
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') || ''

  useEffect(() => {
    fetchDetail()
  }, [id])

  // fetch the application detail
  async function fetchDetail() {
    const detail = await getApplicationDetail({ id })
    // update the step of the application
    setStep(detail.step)
    // update the name of the application
    setName(detail.name)
  }

  // horizontal tabs configuration
  const horizontalTabItems: TabsProps['items'] = [
    {
      key: 'Loan Qualification',
      label: 'Loan Qualification',
      children: 'Loan Qualification'
    },
    {
      key: 'Application Preparation',
      label: 'Application Preparation',
      children: <ApplicationPreparationContents title='Application Preparation' horizontalTab={horizontalTab} />
    },
    {
      key: 'Documents',
      label: 'Documents',
      children: 'Documents'
    },
    {
      key: 'Product Reccomendations',
      label: 'Product Reccomendations',
      children: 'Product Reccomendations'
    },
    {
      key: 'Chat',
      label: 'Chat',
      children: 'Chat'
    },
    {
      key: 'Requests',
      label: 'Requests',
      children: 'Requests'
    },
    {
      key: 'Notes',
      label: 'Notes',
      children: 'Notes'
    }
  ]

  /**
   * Handle the change event of the horizontal tab.
   * @param key The key of the horizontal tab.
   */
  const horizontalTabOnChange = (key: string) => {
    setHorizontalTab(key)
  }

  return (
    <>
      <Operate name={name} id={id} />
      <Steps className='step-wrapper' size='small' current={step} labelPlacement='vertical' items={StepItems} />
      <Tabs defaultActiveKey={'Application Preparation'} items={horizontalTabItems} onChange={horizontalTabOnChange} />
    </>
  )
}

export default ApplicationDetail
