import type { FormInstance, Rule } from 'antd/es/form'
import type { DefaultOptionType } from 'antd/es/select'

type FieldType = 'input' | 'select' | 'date' | 'autoComplete'
export interface DynamicFormFields {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  defaultValue?: string
  prefix?: string
  suffix?: string
  options?: DefaultOptionType[]
  required?: boolean
}
export interface DynamicFormContent {
  title: string
  fields: DynamicFormFields[]
}

export interface DynamicFormProps {
  fields: DynamicFormContent[]
  form: FormInstance<any>
  onFormSubmit: (values: any) => void
}
