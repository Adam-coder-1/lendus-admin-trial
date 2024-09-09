import { useState } from 'react'
import type { FC, ReactNode } from 'react'
import type { DynamicFormContent, DynamicFormFields, DynamicFormProps } from './types'
import {
  Row,
  Col,
  Space,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  AutoComplete,
  type AutoCompleteProps
} from 'antd'
const { Title } = Typography
import { CloseSquareFilled, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import type { Rule } from 'antd/es/form'
import { validateEmail, validatePhoneNumber } from '@/utils/validate'

interface FieldMap {
  input: ReactNode
  select: ReactNode
  date: ReactNode
  autoComplete: ReactNode
}
interface iconMapping {
  [key: string]: ReactNode
}

/**
 * The AutoCompleteEnhance is a functional component that provides an enhanced autocomplete functionality.
 * It takes a field object as a prop which contains the necessary configuration for the autocomplete.
 *
 * @param props - An object that contains the field configuration.
 * @param props.field - An object of type DynamicFormFields which holds details for the autocomplete field.
 */
const AutoCompleteEnhance: FC<{ field: DynamicFormFields }> = ({ field }) => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([])
  return (
    <AutoComplete
      options={options}
      style={{ width: '100%' }}
      onSearch={text => setOptions(field.options?.filter(({ label }) => (label as string)!.includes(text)))}
      placeholder={field.placeholder}
      allowClear={{ clearIcon: <CloseSquareFilled /> }}
    />
  )
}

// Map table for ICONS
const iconMapping: iconMapping = {
  EnvironmentOutlined: <EnvironmentOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />,
  MailOutlined: <MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />,
  PhoneOutlined: <PhoneOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
}

// Validation rule mapping table added by default to the front end
const formRules: Record<string, Rule[]> = {
  email: [{ validator: validateEmail }],
  phone: [{ validator: validatePhoneNumber }]
}

/**
 * The Field component is a functional component that renders different types of form input elements
 * based on the incoming field configuration and title.
 *
 * @param props - An object containing field configuration information and a title.
 * @param props.field - Describes detailed information of the form field, including field type, placeholder, prefix, suffix, default value, options, etc.
 * @param props.title - The title associated with the form field, used to construct the name attribute of the form element.
 */
const Field: FC<{ field: DynamicFormFields; title: string }> = ({ field, title }) => {
  // The fieldMap object maps different field types to corresponding form input element components.
  const fieldMap: FieldMap = {
    input: (
      <Input placeholder={field.placeholder} prefix={iconMapping[field.prefix!]} suffix={iconMapping[field.suffix!]} />
    ),
    select: <Select defaultValue={field.defaultValue} placeholder={field.placeholder} options={field.options} />,
    date: <DatePicker defaultValue={field.defaultValue} placeholder={field.placeholder} style={{ width: '100%' }} />,
    autoComplete: <AutoCompleteEnhance field={field} />
  }
  return (
    <Form.Item
      label={field.label}
      name={[title, field.name]}
      rules={[{ required: field.required }, ...(formRules[field.name] || [])]}
    >
      {fieldMap[field.type]}
    </Form.Item>
  )
}

const DynamicForm: FC<DynamicFormProps> = props => {
  const { form, fields, onFormSubmit } = props

  // Callback event when the form is submitted and data validation is successful
  const onFinish = (values: object) => {
    onFormSubmit(values)
  }

  // Callback event after the form is submitted and data validation fails
  const onFinishFailed = (errorInfo: object) => {
    console.log('Sub component form submitted failed:', errorInfo)
  }

  return (
    <Form layout='vertical' form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Space wrap size='large'>
        {fields.map((item: DynamicFormContent, index: number) => (
          <div key={index}>
            <Title level={4} style={{ marginBottom: '24px' }}>
              {item.title}
            </Title>
            <Row gutter={16}>
              {item.fields.map((field: DynamicFormFields, ind: number) => (
                <Col span={6} key={ind}>
                  <Field field={field} title={item.title} />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Space>
    </Form>
  )
}

export default DynamicForm
