import { type FC, useEffect, useState } from 'react'
import { Flex, Space, Button, Steps, Tabs, Typography, Form, message } from 'antd'
const { Title } = Typography
import type { TabsProps } from 'antd'
import { getApplicationFormList, updateApplication } from '@/api'
import { DynamicForm } from '@/components/DynamicForm'
import { applicationPreparationFieldContent } from '../mock/mockFieldContent'
import dayjs from 'dayjs'
import { useSearchParams } from 'react-router-dom'
import type { LoanPartyFormGroup, LoanPartyFormParams } from '../types'

// vertical tabs for Application Preparation
export const ApplicationPreparationContents: FC<{ title: string; horizontalTab: string }> = ({
  title,
  horizontalTab
}) => {
  const [verticalTab, setVerticalTab] = useState('Loan Parties')
  const [saveLoadings, setSaveLoadings] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') || ''

  useEffect(() => {
    fetchFormList()
  }, [id, horizontalTab, verticalTab])

  // Get the form list data
  async function fetchFormList() {
    try {
      const list = await getApplicationFormList({
        applicationId: id,
        horizontalTabId: horizontalTab,
        verticalTabId: verticalTab
      })
      // Reorganizing data structures
      const data = formatData(list)
      form.setFieldsValue(data)
    } catch (error) {
      message.error('Failed to fetch data')
    }
  }

  /**
   * Format the data structures
   * @param list LoanPartyFormParams[]
   * @returns new data list with type LoanPartyFormGroup[]
   */
  const formatData = (list: LoanPartyFormParams[]) => {
    return (list || []).reduce((pre: LoanPartyFormGroup, cur: LoanPartyFormParams) => {
      const { horizontalTabId, verticalTabId, header, birth, ...rest } = cur
      pre[header!] = { ...rest, birth: birth ? dayjs(birth) : null }
      return pre
    }, {})
  }

  /**
   * Handle the form submission asynchronously.
   * @param values The form data of type LoanPartyFormGroup.
   */
  const onFormSubmit = async (values: LoanPartyFormGroup) => {
    // sets the save loading state to true, then processes the form data.
    setSaveLoadings(true)
    const list: LoanPartyFormParams[] = []
    Object.keys(values).forEach(header => {
      list.push({
        header,
        horizontalTabId: 'Application Preparation',
        verticalTabId: 'Loan Parties',
        ...values[header]
      })
    })
    try {
      await updateApplication(list)
      message.success('Application data is modified successfully.')
    } catch (error) {
    } finally {
      setSaveLoadings(false)
    }
  }

  const onSubmit = () => {
    form.submit()
  }

  // vertical tab configuration
  const verticalTabItems: TabsProps['items'] = [
    {
      key: 'Loan Parties',
      label: 'Loan Parties',
      children: <DynamicForm form={form} fields={applicationPreparationFieldContent} onFormSubmit={onFormSubmit} />
    },
    {
      key: 'Residential History',
      label: 'Residential History',
      children: 'Residential History'
    },
    {
      key: 'Connect to Bank',
      label: 'Connect to Bank',
      children: 'Connect to Bank'
    },
    {
      key: 'Employment History',
      label: 'Employment History',
      children: 'Employment History'
    },
    {
      key: 'Income',
      label: 'Income',
      children: 'Income'
    },
    {
      key: 'Household Expenses',
      label: 'Household Expenses',
      children: 'Household Expenses'
    },
    {
      key: 'Liabilities',
      label: 'Liabilities',
      children: 'Liabilities'
    },
    {
      key: 'Assets',
      label: 'Assets',
      children: 'Assets'
    },
    {
      key: 'Security Property',
      label: 'Security Property',
      children: 'Security Property'
    },
    {
      key: 'Cash Out',
      label: 'Cash Out',
      children: 'Cash Out'
    },
    {
      key: 'ID Verification',
      label: 'ID Verification',
      children: 'ID Verification'
    }
  ]

  /**
   * Handle the change event of the vertical tab.
   * @param key The key of the vertical tab.
   */
  const verticalTabOnChange = (key: string) => {
    setVerticalTab(key)
  }

  return (
    <>
      <Flex gap='middle' justify='space-between' className='title-wrapper'>
        <Title level={3} style={{ marginBottom: '0px' }}>
          {title}
        </Title>
        <Space>
          <Button type='primary'>Edit</Button>
          <Button loading={saveLoadings} onClick={onSubmit}>
            Save changes
          </Button>
        </Space>
      </Flex>
      <Tabs
        defaultActiveKey='Loan Parties'
        items={verticalTabItems}
        tabPosition='left'
        onChange={verticalTabOnChange}
      />
    </>
  )
}
