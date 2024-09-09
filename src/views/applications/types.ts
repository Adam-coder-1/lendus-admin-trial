import type dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export interface APIResult {
  list: any[]
  total: number
}

export interface PageState {
  current: number
  pageSize: number
}

export interface TableDataType {
  id: string
  name: string
}

export interface LoanPartyForm {
  firstName: string
  middleName: string
  lastName: string
  title: string
  birth: string | Dayjs | null
  email: string
  employmentStatus: string
  phone: string
  residencyStatus: string
  address: string
}

export type LoanPartyFormParams = LoanPartyForm & {
  header: string
  horizontalTabId: string
  verticalTabId: string
}

export type LoanPartyFormGroup = { [key: string]: LoanPartyForm }
